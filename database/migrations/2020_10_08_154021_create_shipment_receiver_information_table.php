<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShipmentReceiverInformationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shipment_receiver_information', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('user_gs_number')->nullable();
            $table->string('name')->nullable();
            $table->string('address')->nullable();
            $table->string('country')->nullable();
            $table->string('state')->nullable();
            $table->string('shipment_tracking_number');
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->foreign('user_gs_number')->references('gs_number')->on('users');
            $table->foreign('shipment_tracking_number')->references('tracking_number')->on('shipments');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shipment_receiver_information');
    }
}
