<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class getData extends Controller
{
    public function data(){
        $user = User::all();

        return response()->json([
            'user'=>$user
        ]);
    }

    public function edit($id){
        $user = User::findOrFail($id);

        return response()->json([
            'data' => $user
        ]);
    }

    public function update(Request $request , $id){
        $user = User::findOrFail($id);
        $request->validate([
            'name'=>"required",
            'email'=>'required',
        ]);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();

        return response()->json([
            'message'=>'User Updated',
            'data'=>$user
        ]);
    }

    public function delete($id){
        $user = User::destroy($id);

        return response()->json([
            'delete'=>$user
        ]);
    }
}
