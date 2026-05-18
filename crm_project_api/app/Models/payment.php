<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class payment extends Model
{
protected $fillable = [
    'booking_id',
    'cardHolderName',
    'card_number',
    'expiry_date',
    'cvv',
    'payment_method',
    'status'
];}
