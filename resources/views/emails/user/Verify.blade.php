@component('mail::message')
# Welcome to Glospace

Thanks for registering with us, {{$userName}}. We assure you a sterling service. <br>
In order to enjoy all of the many services we provide, please verify your email by clicking the button below.

@component('mail::button', ['url' => $url, 'color'=>'success'])
Verify Email
@endcomponent

Thanks,<br>
<img src="{{asset('img/GS.png')}}" alt="Glospace" style="width: 100px">
@endcomponent
