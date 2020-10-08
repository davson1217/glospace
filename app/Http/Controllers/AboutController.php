<?php

namespace App\Http\Controllers;

use App\Mail\UserEnquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class AboutController extends Controller
{
    public function ContactUs(Request $request){
        try {
            $params = $request->all();
//            dd($params);
            Mail::to('info@glospacelogistics.com')
                ->send(new UserEnquiry($params['name'],$params['email'],$params['subject'],$params['message']));
        }catch (\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(["success"=>true],200);
    }
}
