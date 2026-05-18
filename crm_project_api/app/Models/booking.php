<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class booking extends Model
{
    protected $fillable = ['user_id','service_id','date', 'status','address','phoneNumber','serviceName','image','price'];
}
