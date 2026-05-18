<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\service;

class ServiceController extends Controller
{
    public function serviceRegister(Request $request){
        $request->validate([
            'serviceName'=>'required',
            'description'=>'required',
            'price'=>'required',
            'image'=>'required'
        ]);

       // Store image
       $filePath = $request->file('image')->store('images', 'public');

        $service = service::create([
            'serviceName'=>$request->serviceName,
            'description'=>$request->description,
            'price'=>$request->price,
            'image' => $filePath
        ]);

        return response()->json([
            'message'=>'new service added',
            'data'=>$service
        ]);
    }

    public function getService(){
        $service = service::all();

        return response()->json([
            'data'=>$service
        ]);
    }

    public function edit($id){
        $service = service::findOrFail($id);

        return response()->json([
            'data'=>$service
        ]);
    }

    public function update(Request $request , $id){
        $service = service::findOrFail($id);
        $request->validate([
            'serviceName'=>'required',
            'description'=>'required',
            'price'=>'required'
        ]);

        $service->serviceName = $request->serviceName;
        $service->description = $request->description;
        $service->price = $request->price;
        $service->save();

        return response()->json([
            'message'=> 'data has been updated!',
            'data'=>$service
        ]);
    }

    public function delete($id){
        $service = service::destroy($id);

        return response()->json([
            'delete'=>$service
        ]);
    }
}
