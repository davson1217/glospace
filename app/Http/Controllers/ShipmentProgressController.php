<?php

namespace App\Http\Controllers;

use App\Models\Shipment;
use App\Models\ShipmentProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ShipmentProgressController extends Controller
{

    #Add New Progress

    public function AddProgress(Request $request){
        try{
            $progress = new ShipmentProgress();
            $params = $request->all();
            $progress->subject = $params["subject"];
            $progress->description = $params["description"];
            $progress->location = $params["location"];
            $progress->shipment_tracking_number = $params["trackingNumber"];
            #$params = $request->all();
            /*$updated = DB::table("shipments_progress")->where('shipment_tracking_number',$params["trackingNumber"])
                ->update([
                    "subject"=>$params["subject"],
                    "description"=>$params["description"],
                    "location"=>$params["location"],
                ]);*/
            if ($progress->save() && $params["range"]){
                DB::table("shipments")->where('id',$params["labelId"])->update(["progress"=>$params["range"]]);
            }
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(["success"=>true,"trackingNumber"=>$params["trackingNumber"]],200);
    }

    #Fetch Shipments including shipment progress
    public function FetchShipmentProgress(Request $request){
        try{
            $shipmentClients = Shipment::where('tracking_number',$request->trackingNumber)->select('sender_user_gs_number','receiver_user_gs_number')->get();
            //dd($shipmentClients[0]->receiver_user_gs_number);
            $sender = $receiver = null;
            if ($shipmentClients[0]->sender_user_gs_number){
                $sender = DB::table('shipments')->join('users','shipments.sender_user_gs_number','=','users.gs_number')
                    ->select('users.gs_number','users.address','users.name','users.state','users.country')
                    ->where('shipments.tracking_number',$request->trackingNumber)
                    ->get();
            }else{
                $sender = DB::table('shipment_sender_information')->where('shipment_tracking_number',$request->trackingNumber)->get();
            }

            if ($shipmentClients[0]->receiver_user_gs_number){
                $receiver = DB::table('shipments')->join('users','shipments.receiver_user_gs_number','=','users.gs_number')
                    ->select('users.gs_number','users.address','users.name','users.state','users.country')
                    ->where('shipments.tracking_number',$request->trackingNumber)
                    ->get();
            }else{
                $receiver = DB::table('shipment_receiver_information')->where('shipment_tracking_number',$request->trackingNumber)->get();
            }

            $progress = DB::table('shipments_progress')
                ->where('shipment_tracking_number',$request->trackingNumber)->orderBy('created_at','desc')->get();
            $progress[0]->sender = $sender;
            $progress[0]->receiver = $receiver;
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(["success"=>true,"progress"=>$progress],200);
    }

    #Delete Shipment including shipment progress
    public function DeleteShipmentProgress(Request $request){
        try{

        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(["success"=>true],200);
    }

}
