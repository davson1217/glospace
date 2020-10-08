<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PaymentRejected extends Mailable
{
    use Queueable, SerializesModels;
    public $invoiceNumber;
    public $clientName;
    public $message;

    /**
     * Create a new message instance.
     *
     * @param string $invoiceNumber
     * @param string $clientName
     * @param string $message
     */
    public function __construct( string $clientName, string $invoiceNumber, string $message)
    {
        $this->invoiceNumber = $invoiceNumber;
        $this->clientName = substr($clientName,0,strpos($clientName," ")) ;
        $this->message = $message;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('info@glospacelogistics.com')
                ->subject("Payment Rejected")
                ->with([
                    "invoiceNumber"=>$this->invoiceNumber,
                    "clientName"=>$this->clientName,
                    "message"=>$this->message,
                ])->markdown('emails.shipment.PaymentRejected');
    }
}
