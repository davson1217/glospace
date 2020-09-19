<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipment extends Model
{
    use HasFactory;
    protected $table = "shipments";

    public function ShipmentProgress(){
        return $this->hasMany('\App\ShipmentProgress');
    }

}
