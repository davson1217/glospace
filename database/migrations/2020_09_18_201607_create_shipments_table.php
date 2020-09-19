<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShipmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shipments', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("user_gs_number");
            $table->string("tracking_number")->unique();
            $table->date("estimated_delivery");
            $table->string("delivery_note")->nullable();
            $table->string("package_description");
            $table->smallInteger("progress_bar")->default(10);
            $table->foreign("user_gs_number")->references('gs_number')->on('users')->onDelete("RESTRICT")->onDelete("RESTRICT");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shipments');
    }
}
