<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShipmentsProgressTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shipments_progress', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("shipment_tracking_number");
            $table->string("tracking_header_text")->nullable();
            $table->string("tracking_header_text_two")->nullable();
            $table->string("subject");
            $table->string("description");
            $table->string("location");
            $table->foreign("shipment_tracking_number")->references("tracking_number")->on("shipments")->onDelete("CASCADE")->onUpdate("CASCADE");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shipments_progress');
    }
}
