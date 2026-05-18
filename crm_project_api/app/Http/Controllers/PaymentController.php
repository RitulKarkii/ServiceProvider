<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\payment;
use App\Models\booking;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
      public function payment(Request $request){

        $request->validate([
            'booking_id'=>'required | exists:bookings,id',
            'cardHolderName'=>'required',
            'card_number'=>'required',
            'expiry_date'=>'required',
            'cvv'=>'required',
            'payment_method'=>'required'

        ]);

        $payment = payment::create([
            'booking_id'=>$request->booking_id,
            'cardHolderName'=>$request->cardHolderName,
            'card_number'=>$request->card_number,
            'expiry_date'=>$request->expiry_date,
            'cvv'=> $request->cvv,
            'payment_method'=>$request->payment_method
        ]);

          Booking::where('id',$request->booking_id)
            ->update([
                'status' => 'accepted'
            ]);

        return response()->json([

            'message'=>'Payment Success',
            'data'=> $payment
        ]);

    }

    public function order($id){
        
        $order = booking::where('user_id',$id)
       ->where('status','accepted')
       ->get();

       return response()->json([
        'data'=>$order
       ]);
    }
}
