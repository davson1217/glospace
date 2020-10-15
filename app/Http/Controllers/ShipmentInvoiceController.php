<?php

namespace App\Http\Controllers;

use App\Enums\InvoiceStatus;
use App\Mail\InvoiceCreated;
use App\Mail\InvoicePaid;
use App\Mail\ShipmentCreated;
use App\Models\ShipmentInvoice;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class ShipmentInvoiceController extends Controller
{
    #client-side request
    public function SortInvoice(Request $request){
        try{
            $cat = $request->category === "Unpaid" ? InvoiceStatus::Unpaid : InvoiceStatus::Paid;
            $inCat = $cat === 0? [0,2] : [1];
            $gs = User::where("id",Auth::id())->pluck("gs_number");
            $invoices = DB::table("shipment_invoice")
                ->leftJoin("invoice_payment","shipment_invoice.invoice_number","=","invoice_payment.invoice_number")
                ->select("shipment_invoice.*","invoice_payment.payment_document as has_upload")
                ->where("user_gs_number",$gs[0])
                ->whereIn("is_paid",$inCat)
                ->get();
//            $hasUpload = DB::table('invoice_payment')->where("invoice_number")
//            dd($invoices);
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(["success"=>true,"invoices"=>$invoices],200);
    }

    public function create (Request $request){
        try {
            $params = $request->all();
            $invoice = new ShipmentInvoice();
//            dd($params["user_gs"]);
            $invoice->shipment_tracking_number = $params["tracking_number"];
            $invoice->invoice_number = $params["invoice_number"];
            $invoice->cost = $params["amount"];
            $invoice->currency = $params["currency"];
            $invoice->is_paid = InvoiceStatus::Unpaid;
            $invoice->user_gs_number = $params["user_gs"];//we're storing available GS number here (sender's by default). In the event either of both clients do not have a GSN trace this to Label.js
            $invoice->description = $params["invoiceNote"] ? $params["invoiceNote"] : null;

            if ($invoice->save()){
                //Send Invoice mail to shipment sender
                $sender = DB::table('shipments')->where('tracking_number',$params["tracking_number"])->pluck('sender_user_gs_number');
//                dd($sender);
                if ($sender[0] !== null){
                    $user = User::where("gs_number",$sender[0])->get();
                    Mail::to($user[0])->send(new InvoiceCreated($user[0]->name,$params["tracking_number"],$params["invoiceNote"]));
                }else{
                    $user = DB::table('shipment_sender_information')->where('shipment_tracking_number',$params["tracking_number"])->get();
                    Mail::to($user[0]->email)->send(new InvoiceCreated($user[0]->name,$params["tracking_number"],$params["invoiceNote"]));
                }
            }
        }catch (\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(["success"=>true],200);
    }

    public function view (Request $request){
        try{
            $invoice = ShipmentInvoice::where("shipment_tracking_number",$request->number)
                ->select("*")->get();
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(['success'=>true, 'invoice'=>$invoice],200);
    }

    /*public function InvoiceIsPaid (Request $request){
        try{
            $payStatus = DB::table("shipment_invoice")->where("id",$request->id)->select("is_paid")->get();
            DB::table("shipment_invoice")->where("id",$request->id)
                ->update(["is_paid"=>$payStatus[0]->is_paid === 1 ? InvoiceStatus::Unpaid : InvoiceStatus::Paid]);
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(['success'=>true],200);
    }*/

    public function GetInvoiceWithProps (Request $request){
        try {
//            dd($request->number);
             $details=  DB::table("shipment_invoice")
                   ->leftJoin("shipments","shipment_invoice.shipment_tracking_number","=","shipments.tracking_number")
//                   ->join("users","shipments.user_gs_number","=","users.gs_number")select 'users.*',
                 ->select('shipments.*','shipment_invoice.*','shipment_invoice.created_at as invoice_date')
                   ->where("shipment_invoice.invoice_number","=",$request->number)->get();
             $sender = $receiver = null;
            if ($details[0]->sender_user_gs_number){
                $sender = DB::table('shipments')->join('users','shipments.sender_user_gs_number','=','users.gs_number')
                    ->select('users.gs_number','users.address','users.name','users.state','users.country')
                    ->where('shipments.tracking_number',$details[0]->shipment_tracking_number)
                    ->get();
            }else{
                $sender = DB::table('shipment_sender_information')->where('shipment_tracking_number',$details[0]->shipment_tracking_number)->get();
            }

            if ($details[0]->receiver_user_gs_number){
                $receiver = DB::table('shipments')->join('users','shipments.receiver_user_gs_number','=','users.gs_number')
                    ->select('users.gs_number','users.address','users.name','users.state','users.country')
                    ->where('shipments.tracking_number',$details[0]->shipment_tracking_number)
                    ->get();
            }else{
                $receiver = DB::table('shipment_receiver_information')->where('shipment_tracking_number',$details[0]->shipment_tracking_number)->get();
            }
            $details[0]->sender = $sender;
            $details[0]->receiver = $receiver;
//            dd($details);
        }catch (\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(["success"=>true,"details"=>$details],200);
    }

    public function delete (Request $request){
        try{
            ShipmentInvoice::where("id",$request->id)->delete();
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(['success'=>true],200);
    }


}
