<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ShipmentCreated extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $trackingNumber;
    public $clientName;
    public $hasGS;

    /**
     * ShipmentCreated constructor.
     * @param string $consignmentNum
     * @param string $clientName
     * @param bool $hasGS
     */
    public function __construct(string $consignmentNum, string $clientName, bool $hasGS)
    {
        $this->trackingNumber = $consignmentNum;
        $this->hasGS = $hasGS;
        $this->clientName = substr($clientName,0,strpos($clientName," ")) ;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('info@glospacelogistics.com','Glospace Logistics')
            ->subject("Shipment Created")
            ->with([
                "trackingNumber"=>$this->trackingNumber,
                "clientName"=>$this->clientName,
            ])->markdown('emails.shipment.created');
    }
}
