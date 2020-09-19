<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ShipmentsController extends Controller
{
                # Add a new Shipment
    public function Create (Request $request){
        try{
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
                return response()->json(['success'=>false,]);
            }
            $params = $request->all();
            DB::table('shipments')->insert([
               'created_at' => Carbon::now(),
               'updated_at' => Carbon::now(),
               'user_gs_number' => $params['GSNumber'],
               'tracking_number' => $params['trackingNum'],
               'estimated_delivery' => $params['estDelivery'],
               'delivery_note' => $params['deliveryNote'],
            ]);
            DB::table('shipments_progress')->insert([
               'shipment_tracking_number' => $params['trackingNum'],
               'tracking_header_text' => "Shipment Prepared",
               'subject' => $params['subject'],
               'description' => 'Order Processed: Ready for Shipment',
               'location' => $params['location'],
               'progress_bar' => 1,
            ]);
        }catch (\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
            return response()->json(["success"=>true],200);
    }

                #Fetch Shipments including shipment progress
    public function FetchShipments(Request $request){
        try{
            $shipments = DB::table('shipments')
                ->orderBy('created_at')
                ->limit('3')->get();
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(["success"=>true,"shipments"=>$shipments],200);
    }
                #Fetch Shipments including shipment progress
    public function FetchShipmentProgress(Request $request){
        try{
            $user = DB::table('shipments')->join('users','shipments.user_gs_number','=','users.gs_number')
                ->select('users.gs_number','users.name','users.state','users.country')->where('shipments.tracking_number',$request->trackingNumber)->get();
            $progress = DB::table('shipments_progress') ->where('shipment_tracking_number',$request->trackingNumber)->orderBy('created_at')->get();
            $progress[0]->client = $user;
            //$progress[0]->creaed_at = $dt->toRfc7231String();
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(["success"=>true,"progress"=>$progress],200);
    }
}
