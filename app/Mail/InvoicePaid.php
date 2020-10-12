<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InvoicePaid extends Mailable
{
    use Queueable, SerializesModels;
    public $clientName;
    public $invoiceNumber;

    /**
     * Create a new message instance.
     *
     * @param string $clientName
     * @param string $invoiceNumber
     */
    public function __construct(string $clientName, string $invoiceNumber)
    {
        $this->clientName = substr($clientName,0,strpos($clientName," "));
        $this->invoiceNumber = $invoiceNumber;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return  $this->from('info@glospacelogistics.com','Glospace Logistics')
                ->subject("Invoice Paid")
                ->with([
                    "invoiceNumber"=>$this->invoiceNumber,
                    "clientName"=>$this->clientName,
                ])->markdown('emails.shipment.InvoicePaid');
    }
}
