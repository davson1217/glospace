<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InvoiceCreated extends Mailable
{
    use Queueable, SerializesModels;
    public $clientName;
    public $shipmentNumber;
    public $invoiceNote;

    /**
     * Create a new message instance.
     *
     * @param string $clientName
     * @param string $shipmentNumber
     * @param string $invoiceNote
     */
    public function __construct(string $clientName, string $shipmentNumber, string $invoiceNote)
    {
        $this->clientName = substr($clientName,0,strpos($clientName," "));
        $this->invoiceNote = $invoiceNote;
        $this->shipmentNumber = $shipmentNumber;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->subject("Invoice Available")
            ->with([
                "trackingNumber"=>$this->shipmentNumber,
                "clientName"=>$this->clientName,
                "note"=>$this->invoiceNote,
            ])->markdown('emails.shipment.InvoiceCreated');
    }
}
