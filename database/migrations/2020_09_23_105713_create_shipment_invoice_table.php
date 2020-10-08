<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShipmentInvoiceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shipment_invoice', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer("invoice_number")->unique();
            $table->string("shipment_tracking_number");
            $table->string("user_gs_number");
            $table->string("currency");
            $table->integer("cost");
            $table->tinyInteger("is_paid");
            $table->string("description")->nullable();
            $table->foreign("shipment_tracking_number")
                ->references("tracking_number")
                ->on("shipments")
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->foreign("user_gs_number")
                ->references("gs_number")
                ->on("users")
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shipment_invoice');
    }
}
