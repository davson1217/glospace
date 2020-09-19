<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function All(){
        try {
            $accounts = User::all();
        }catch (\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(['success'=>true, 'accounts'=>$accounts],200);
    }

    public function UpdateVerifiedStatus(Request $request){
        try {
            $status = $request->status === 0 ? 1 : 0;
            User::where('id',$request->accountId)->update(['is_verified' => $status]);
        }catch (\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(['success'=>true],200);
    }

    public function FilterResult(Request $request){
        try {
            if ($request->filter === 1){ $filter = 1;}elseif($request->filter === 0) { $filter = 0; }else $filter = 2;
            $accounts = User::where('is_verified',$filter)->get();
        }catch (\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(['success'=>true,"accounts"=>$filter == 2 ? $accounts = User::all() : $accounts],200);
    }

    public function CheckGSNumber(Request $request){
        try {
            $account = User::where("gs_number",$request->number)->get();
        }catch (\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(['success'=>true,"account"=>$account],200);
    }

}
