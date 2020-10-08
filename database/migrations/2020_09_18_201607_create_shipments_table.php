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
            $table->string("sender_user_gs_number");
            $table->string("receiver_user_gs_number");
            $table->string("tracking_number")->unique();
            $table->date("estimated_delivery");
            $table->string("delivery_note")->nullable();
            $table->string("package_description");
            $table->float("package_weight")->default(0);
            $table->smallInteger("progress_bar")->default(1)->nullable();
            $table->tinyInteger("is_show_bar")->default(1);
            $table->tinyInteger("is_complete")->default(0);
            $table->foreign("sender_user_gs_number")->references('gs_number')->on('users')->onUpdate("RESTRICT")->onDelete("CASCADE");
            $table->foreign("receiver_user_gs_number")->references('gs_number')->on('users')->onUpdate("RESTRICT")->onDelete("CASCADE");
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
