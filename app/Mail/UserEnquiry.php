<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserEnquiry extends Mailable
{
    use Queueable, SerializesModels;

    public $name;
    public $email;
    public $subject;
    public $message;
    /**
     * Create a new message instance.
     *
     * @param string $name
     * @param string $email
     * @param string $subject
     * @param string $message
     */
    public function __construct(string $name, string $email, string $subject, string $message)
    {
        $this->name = $name;
        $this->email = $email;
        $this->subject = $subject;
        $this->message = $message;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from($this->email)
            ->subject("ENQUIRY:::".$this->subject)
            ->with([
                "userName"=>$this->name,
                "message"=>$this->message,
            ])->markdown('emails.user.Enquiry');
    }
}
