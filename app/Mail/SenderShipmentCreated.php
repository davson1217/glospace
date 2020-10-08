<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SenderShipmentCreated extends Mailable
{
    use Queueable, SerializesModels;
    public $trackingNumber;
    public $clientName;
    public $hasGS;

    /**
     * Create a new message instance.
     * @param string $consignmentNum
     * @param string $clientName
     * @param bool $hasGS
     */

    public function __construct(string $consignmentNum, string $clientName, bool $hasGS)
    {
        $this->clientName = substr($clientName,0,strpos($clientName," "));
        $this->trackingNumber = $consignmentNum;
        $this->hasGS = $hasGS;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('info@glospacelogistics.com')
            ->subject("Shipment Created")
            ->with([
                "trackingNumber"=>$this->trackingNumber,
                "clientName"=>$this->clientName,
            ])->markdown('emails.shipment.senderShipmentCreated');
    }
}
