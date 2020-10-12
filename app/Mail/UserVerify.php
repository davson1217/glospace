<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserVerify extends Mailable
{
    use Queueable, SerializesModels;
    public $name;
    public $email;
    public $url;
    public $userId;

    /**
     * Create a new message instance.
     * @param string $name
     * @param string $email
     * @param int $userId
     */
    public function __construct(string $name, string $email, int $userId)
    {
        $this->name = $name;
        $this->email = $email;
        $this->userId = $userId;
        $this->url = "https://glospacelogistics.com/dashboard/".$userId;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('info@glospacelogistics.com','Glospace Logistics')
            ->subject("Welcome to Glosapce")
            ->with([
                "userName"=>$this->name,
                "url"=>$this->url,
            ])
            ->markdown('emails.user.Verify');
    }
}
