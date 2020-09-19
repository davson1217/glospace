<?php

namespace App\Http\Controllers;

use App\Models\Slide;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Mockery\Exception;
use Illuminate\Support\Facades\File;
use function GuzzleHttp\Promise\all;

class SlidesController extends Controller
{
    public function All(){
        try {
            $slides = Slide::all();
        }catch (\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(["success"=>true,"slides"=>$slides],200);
    }

    public function Add(Request $request){
        try {
//            dd($request->btnText);
            $bg = $side =  $bgExt = $sideExt = null;
            if ($request->hasFile('bgPhoto')){
                $bg = $request->file('bgPhoto');
                $side = $request->file('sidePhoto');
                if ($request->file('bgPhoto')->isValid()){
                    $bgExt = $bg->getClientOriginalExtension();
                    Storage::disk('public')->put('slides'.'/'.$bg->getFilename().'.'.$bgExt,File::get($bg));
                }else throw new Exception("Invalid File");

                if ($request->hasFile('sidePhoto') && $request->file('sidePhoto')->isValid()){
                    $sideExt = $side->getClientOriginalExtension();
                    Storage::disk('public')->put('slides'.'/'.$side->getFilename().'.'.$sideExt,File::get($side));
                }else throw new Exception("Invalid File");
            }
            $slide = new Slide();
            $slide->intro_text = $request->introText;
            $slide->closing_text = $request->closingText;
            $slide->header_one = $request->headerTextOne;
            $slide->header_two = $request->headerTextTwo;
            $slide->button_text = $request->btnText;
            $slide->button_link = $request->btnURL;
            $slide->bg = $bg->getFilename().".".$bgExt;
            $slide->side_photo = $side->getFilename().".".$sideExt;
            $slide->save();
        }catch (\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(["success"=>true],200);
    }

    public function Delete(Request $request){
        try {
            $params = $request->all();
            if (Slide::where("id",$params["slideId"])->delete()){
                Storage::disk("public")->delete("slides"."/".$params["bgPhoto"]);
                Storage::disk("public")->delete("slides"."/".$params["sidePhoto"]);
            }
        }catch (\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],200);
        }
        return response()->json(["success"=>true],200);
    }
}
