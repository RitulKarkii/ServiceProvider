<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request){
        $request->validate([
            'name'=>'required',
            'email'=>'required',
            'password'=>'required',
        ]);
        $isFirstUser = User::count() == 0;
        $role = $isFirstUser ? 'admin' : 'user';

        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
            'role'=>$role
        ]);

        return response()->json([
            'message'=>'user registered!',
            'user'=>$user,
            'role'=>$role
        ]);
    }

    public function login(Request $request){
        $request->validate([
            'email'=>'required',
            'password'=>'required',
        ]);

        $credentials = $request->only('email','password');

        if(Auth::attempt($credentials)){
            $user = Auth::user();
            $token = $user->createToken('api-token')->plainTextToken;

            return response()->json([
                'message'=>'user Logged-In!',
                'user'=>$user,
                'token'=>$token
            ]);
        }

        return response()->json([
            'message'=>'Invalid Credentials'
        ],401);
    }
}
