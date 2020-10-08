@component('mail::message')
# Welcome to Glospace

Thanks for registering with us, {{$userName}}. We assure you a sterling service.

@component('mail::button', ['url' => $url, 'color'=>'success'])
Verify Email
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
