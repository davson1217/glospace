<?php

namespace App\Http\Controllers;

use App\Enums\InvoiceStatus;
use App\Mail\InvoicePaid;
use App\Mail\PaymentRejected;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Mockery\Exception;

class PaymentUploadController extends Controller
{

    public function PaymentUpload(Request $request){
        try{
            $file =  $extension = null;
            if ($request->hasFile('file')){
                $file = $request->file('file');
                if ($request->file('file')->isValid()){
                    $extension = $file->getClientOriginalExtension();
                    Storage::disk('public')->put('payments'.'/'.$file->getFilename().'.'.$extension,File::get($file));
                }
            }
            DB::table("invoice_payment")->insert([
                "created_at"=>Carbon::now(),
                "updated_at"=>Carbon::now(),
                "invoice_number"=>$request->input("invoice_number"),
                "payment_document"=>$file->getFilename().".".$extension
            ]);
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(["success"=>true],200);
    }

    public function GetUnconfirmedUploads(Request $request){
        try{
            $cond = null;
            $filter = $request->filter;
//            dd($filter);
            $uploads = DB::table("invoice_payment")
                ->join("shipment_invoice","invoice_payment.invoice_number","=","shipment_invoice.invoice_number")
                ->where('shipment_invoice.is_paid',InvoiceStatus::Unpaid)
                ->select("invoice_payment.*")->get();
            if ($filter){
                switch ($filter){
                    case "confirmed": $cond =  InvoiceStatus::Paid;break;
                    case "unconfirmed":$cond =  InvoiceStatus::Unpaid;break;
                    case "rejected":$cond =  InvoiceStatus::Rejected;break;
                    default : throw new Exception("Error");
                }
                $uploads = DB::table("invoice_payment")
                    ->join("shipment_invoice","invoice_payment.invoice_number","=","shipment_invoice.invoice_number")
                    ->select("invoice_payment.*")->where("shipment_invoice.is_paid",$cond)->get();
            }

        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(["success"=>true,"uploads"=>$uploads],200);
    }

    public function PaymentConfirmed(Request $request){
        try{
            if (DB::table("shipment_invoice")->where("invoice_number",$request->invoiceNumber)->update(["is_paid"=>1])){
                $user = DB::table("shipment_invoice")->leftJoin('users','shipment_invoice.user_gs_number','=','users.gs_number')
                    ->select('users.*')->where('shipment_invoice.invoice_number',$request->invoiceNumber)->get();

                Mail::to($user[0]->email)->send(new InvoicePaid($user[0]->name,$request->invoiceNumber));
            }

        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(["success"=>true],200);
    }

    public function PaymentReject(Request $request){
        try{
//            dd($request->all());
            $params = $request->all();
            if(DB::table("shipment_invoice")->where("invoice_number",$params["invoiceNumber"])->update(["is_paid"=>InvoiceStatus::Rejected])){
                $user = DB::table("shipment_invoice")->leftJoin('users','shipment_invoice.user_gs_number','=','users.gs_number')
                    ->select('users.*')->where('shipment_invoice.invoice_number',$params["invoiceNumber"])->get();
                Mail::to($user[0]->email)
                    ->send(new PaymentRejected($user[0]->name,$params["invoiceNumber"],$params["message"]));
            }
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(["success"=>true],200);
    }

}
