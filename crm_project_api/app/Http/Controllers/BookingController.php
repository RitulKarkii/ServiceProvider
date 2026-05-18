<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\service;
use App\Models\booking;

class BookingController extends Controller
{
    public function booking(Request $request){
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'service_id' => 'required|exists:services,id',
            'date' => 'required',
            'address'=>'required',
            'phoneNumber'=>'required'
        ]);

        // Get service data from services table
        $service = service::find($request->service_id);
        $booking = booking::create([
             'user_id' => $request->user_id,
             'service_id' => $service->id,
             'serviceName'=>$service->serviceName,
             'image'=>$service->image,
             'price'=>$service->price,
             'date' => $request->date,
             'address'=>$request->address,
             'phoneNumber'=>$request->phoneNumber
        ]);

        return response()->json([
            'message'=>"booking added",
            'booking'=>$booking
        ]);
    }

    public function cartData($id){
        $cart = booking::where('user_id',$id)
       ->where('status','pending')
       ->get();

        return response()->json([
            'data'=>$cart
        ]);

      
    }

    public function delete($id){
        $delete = booking::destroy($id);

        return response()->json([
            'delete' => $delete
        ]);
    }
}
