<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPassword extends Mailable
{
    use Queueable, SerializesModels;
    public $name;
    public $url;

    /**
     * Create a new message instance.
     * @param string $name
     * @param string $gs_number
     */
    public function __construct(string $name, string $gs_number)
    {
        $this->name = substr($name,0,strpos($name,' '));
        $this->url = 'https://glospacelogistics.com/password-reset/'.$gs_number;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('info@glospacelogistics.com','Glospace Logistics')
            ->subject("Reset your password")
            ->with([
                "name"=>$this->name,
                "url"=>$this->url,
            ])->markdown('emails.user.ResetPassword');
    }
}
