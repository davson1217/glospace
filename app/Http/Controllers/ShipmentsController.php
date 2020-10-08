<?php

namespace App\Http\Controllers;

use App\Mail\SenderShipmentCreated;
use App\Mail\ShipmentCreated;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ShipmentsController extends Controller
{
                # ADMIN:: Add a new Shipment
    public function Create (Request $request){
        try{
//            dd($request->all());

            $validator = Validator::make($request->all(), [
                'GSNumber' => 'required|max:10',
                'trackingNum' => 'required|max:13',
                'estDelivery' => 'required',
                'deliveryNote' => 'required',
                'subject' => 'required',
                'location' => 'required',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
            if ($validator->fails()) {
               // return response()->json(['success'=>false,]);
            }
            $params = $request->all();
//            dd($params['receiver']["name"]);
            $SenderGSN = !is_array($params['sender']) ? $params['sender'] : null;
            $ReceiverGSN = !is_array($params['receiver']) ? $params['receiver'] : null;
            DB::table('shipments')->insert([
               'created_at' => Carbon::now(),
               'updated_at' => Carbon::now(),
               'sender_user_gs_number' => $SenderGSN,
               'receiver_user_gs_number' => $ReceiverGSN,
               'tracking_number' => $params['trackingNum'],
               'estimated_delivery' => $params['estDelivery'],
               'delivery_note' => $params['deliveryNote'],
               'package_description' => $params['packageDesc'],
               'package_weight' => $params['packageWeight'],
               'progress' => $params['progressRange']
            ]);
            DB::table('shipments_progress')->insert([
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
               'shipment_tracking_number' => $params['trackingNum'],
               'tracking_header_text' => "Shipment Prepared",
               'subject' => $params['subject'],
               'location' => $params['location'],
               'description' => 'Order Processed: Ready for Shipment',
            ]);

            //if shipment sender is not a GS user, store all sender information
            if (!$SenderGSN){
                DB::table('shipment_sender_information')->insert([
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                    'name'=>$params['sender']['name'],
                    'shipment_tracking_number'=>$params['trackingNum'],
                    'email'=>$params['sender']['email'],
                    'address'=>$params['sender']['address'],
                    'country'=>$params['sender']['country'],
                    'state'=>$params['sender']['city'],
                    'phone'=>$params['sender']['phone'],
                ]);
            }
            //if shipment receiver is not a GS user, store all receiver information
            if (!$ReceiverGSN){
                DB::table('shipment_receiver_information')->insert([
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                    'name'=>$params['receiver']['name'],
                    'shipment_tracking_number'=>$params['trackingNum'],
                    'email'=>$params['receiver']['email'],
                    'address'=>$params['receiver']['address'],
                    'country'=>$params['receiver']['country'],
                    'state'=>$params['receiver']['city'],
                    'phone'=>$params['receiver']['phone'],
                ]);
            }


        ############# SEND SHIPMENT CREATED EMAIL ###############
            $sender = $receiver= null;
            if ($SenderGSN){
                $sender = User::where("gs_number",$SenderGSN)->get();
                Mail::to($sender[0]->email)->send(new ShipmentCreated($params["trackingNum"],$sender[0]->name,true));
            }else{
                Mail::to($params['sender']['email'])->send(new SenderShipmentCreated($params["trackingNum"],$params['sender']['name'],false));
            }

            if ($ReceiverGSN){
                $receiver = User::where("gs_number",$ReceiverGSN)->get();
                Mail::to($receiver[0]->email)->send(new ShipmentCreated($params["trackingNum"],$receiver[0]->name,true));
            }else{
                Mail::to($params['receiver']['email'])->send(new ShipmentCreated($params["trackingNum"],$params['receiver']['name'],false));
            }
        ############# SEND SHIPMENT CREATED EMAIL ###############

//            $user = User::where("gs_number",$GSN)->get();
//            Mail::to($user[0]->email)->send(new ShipmentCreated($params["trackingNum"],$user[0]->name));
        }catch (\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(["success"=>true],200);
    }

            # ADMIN:: Fetch Shipments including shipment progress
    public function FetchShipments(Request $request){
        try{
//            dd($request->limit);
            $shipments = [];
            if($request->limit !== null){
                $shipments = DB::table('shipments')
                ->leftJoin("shipment_invoice","shipments.tracking_number","=","shipment_invoice.shipment_tracking_number")
                ->select("shipments.*","shipment_invoice.is_paid as invoice_paid")
                ->orderBy('shipments.created_at','desc')->limit($request->limit)->get();
            }else
                $shipments = DB::table('shipments')
                    ->leftJoin("shipment_invoice","shipments.tracking_number","=","shipment_invoice.shipment_tracking_number")
                    ->select("shipments.*","shipment_invoice.is_paid as invoice_paid")
                    ->orderBy('shipments.created_at','desc')->get();

        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(["success"=>true,"shipments"=>$shipments],200);
    }

            #ADMIN:: Delete Shipment
    public function DeleteShipment (Request $request){
            try{
//                dd($request->shipmentId);
                DB::table('shipments')->where('tracking_number', $request->shipmentId)->delete();
            }catch (\Exception $e ){
                return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
            }
        return response()->json(["success"=>true],200);
    }

    #CLIENT:: Track Shipment

    public function ClientTrackShipment (Request $request){
        try{
            $shipment = DB::table('shipments')
                        ->select("estimated_delivery","delivery_note","progress as bar","is_show_bar")
                        ->where("tracking_number",$request->input("tracking_number"))->get();
            $progress = DB::table('shipments_progress')
                ->where('shipment_tracking_number',$request->tracking_number)
                ->orderBy('created_at','desc')->get();
            if (count($shipment))
            $shipment[0]->progress = $progress;
        }catch (\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(["success"=>true,"tracking"=>count($shipment)?$shipment : null],200);
    }
}


