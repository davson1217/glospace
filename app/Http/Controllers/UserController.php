<?php

namespace App\Http\Controllers;

use App\Enums\UserType;
use App\Mail\ResetPassword;
use App\Mail\UserVerify;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Mockery\Exception;

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

    /**
     * Get Registered User Attributes to send Welcome Email.
     * @param array $user
     */
    protected function SendVerifyEmail(Array $user = []){
        try {
            if (!count($user)){
                $email = Auth::user()->email;
                Mail::to($email)->send(new UserVerify(Auth::user()->name,$email,Auth::id()));
                return response()->json(['success'=>true],200);
            }else
            if(Mail::to($user["email"])->send(new UserVerify($user["name"],$user["email"],$user["id"]))){
                return response()->json(['success'=>true],200);
            }
        }catch (\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
    }

    public function Register(Request $request){
        try{
            #Must add validation

            $params = $request->all();
            $GSN = strlen($params["GS"]) < 10 ? $params["GS"].rand(0,10 - strlen($params["GS"])) : $params["GS"];
            $user = new User();
            $user->gs_number = $GSN;
            $user->user_type = UserType::Client;
            $user->name = $params["name"];
            $user->address = $params["address"];
//            $user->addressTwo = $params["addressTwo"];
            $user->email = $params["email"];
            $user->phone = $params["phone"];
            $user->country = $params["country"];
            $user->state = $params["state"];
            $user->city = $params["city"];
            $user->password = Hash::make($params['password']);
            $user->unique_id = $params["ID"];

            if ($user->save()) {
                $this->SendVerifyEmail($user->attributesToArray());
            }

        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(['success'=>true],200);
    }

    public function EmailVerified(Request $request){
        try {
//            dd(Auth::user()->city);
            $param = $request->input("userID");
            if (User::find($param)){
                DB::table('users')->where('id',$param)->update(["email_verified_at"=>Carbon::now()]);
                return response(["success"=>true,"msg"=>"Verified"]);
            }else{
                return response(["success"=>true,"msg"=>"Invalid"]);
            }
        }catch (\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
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
            $accounts = [];
            if ($request->input("filter") === "GSN"){
                $accounts = DB::table("users")->where("gs_number",$request->GSN)->get();
            }else
            switch ($request->input("filter")){
                case 0 : $accounts = DB::table("users")->whereNull('email_verified_at')->get();break;
                case 1 : $accounts = DB::table("users")->whereNotNull('email_verified_at')->get();break;
                case 2 : $accounts = User::all();break;
                case "GSN" : dd("Poop");break;
                default : throw new Exception("Invalid");
            }
        }catch (\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(['success'=>true,"accounts"=>$accounts],200);
    }

    public function FilterByGSN(Request $request){
        try {
           dd($request->GSN);
        }catch (\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(['success'=>true,"account"=>$account],200);
    }

    public function CheckGSNumber(Request $request){
        try {
            $account = User::where("gs_number",$request->number)->get();
        }catch (\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(['success'=>true,"account"=>$account],200);
    }

    public function Update(Request $request){
        try {
            $params = $request->all();
                if ($request->newPass && $request->currentPass){
                    if (Hash::check($params['currentPass'], Auth::user()->getAuthPassword())) {
                        DB::table('users')->where('id',Auth::id())->update(['password'=> Hash::make($params['newPass'])]);
                        return response()->json(['success'=>true,'message'=>'CORRECT'],200);
                    }else return response()->json(['success'=>true, 'message'=>'INCORRECT'],200);
                }else
            DB::table('users')->where('id',Auth::id())->update([$params['name']=>$params['change']]);

        }catch (\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(['success'=>true],200);
    }

    public function PasswordReset(Request $request){
        try{
            $email = $request->input('email');
            if (count(User::where('email',$email)->get())){
                $user = User::where('email',$email)->get();
                Mail::to($user[0])->send(new ResetPassword($user[0]->name,$user[0]->gs_number));
            }else{
                return response()->json(['success'=>true, "msg"=>"Invalid"],200);
            }
        }catch (\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(['success'=>true],200);
    }

    public function ChangePassword(Request $request){
        try{
            DB::table('users')->where('gs_number',$request->input('GSN'))
                ->update(['password'=>Hash::make($request->input('password'))]);
        }catch (\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(['success'=>true],200);
    }

    public function DeleteClient(){
        try {
            $user = User::find(Auth::id());
            $user->delete();
        }catch (\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(['success'=>true],200);
    }

    /**
     *  Create a Super Admin profile
    */
    public function CreateSuper (Request $request){
        try{
            $params = $request->all();

            $user = new User();
            $user->name = $params["name"];
            $user->user_type = UserType::SuperAdmin;
            $user->gs_number = "GS00".rand(0,10);
            $user->address = "Super Admin";
            $user->city = "Super Admin";
            $user->state = "Super Admin";
            $user->country = "Super Admin";
            $user->phone = 000;
            $user->unique_id = rand(10,1000);
            $user->email = $params["email"];
            $user->email_verified_at = Carbon::now();
            $user->password = Hash::make($params["password"]);
            $user->save();
        }catch (\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(['success'=>true],200);
    }
}
