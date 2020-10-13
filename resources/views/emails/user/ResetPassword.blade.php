@component('mail::message')
# Reset your password

Dear {{$name}}, you may reset your password by clicking the button below.

@component('mail::button', ['url' => $url])
Reset Password
@endcomponent

<br>
{{ config('app.name') }}
@endcomponent
