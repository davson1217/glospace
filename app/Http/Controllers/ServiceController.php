<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class ServiceController extends Controller
{
    public function All(){
        try {
            $services = Service::all();
        }catch (\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(["success"=>true,"services"=>$services],200);
    }

    public function Add(Request $request){
        try {
            $file =  $extension = null;
            if ($request->hasFile('file')){
                $file = $request->file('file');
                if ($request->file('file')->isValid()){
                    $extension = $file->getClientOriginalExtension();
                    Storage::disk('public')->put('services'.'/'.$file->getFilename().'.'.$extension,File::get($file));
                }
            }
            $service = new Service();
            $service->title = $request->title;
            $service->description = $request->description;
            $service->photo = $file->getFilename().".".$extension;
            $service->save();
        }catch (\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(["success"=>true],200);
    }

    public function Edit(Request $request){
        try {

        }catch (\Exception $e){

        }
    }

    public function Delete(Request $request){
        try {
            if (Service::where("id",$request->serviceId)->delete()){
                Storage::disk("public")->delete("services"."/".$request->fileName);
            }
        }catch (\Exception $e){
         return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
         return response()->json(["success"=>true],200);
    }

}
