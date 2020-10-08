@component('mail::message')
# We couldn't confirm your payment.

Dear {{$clientName}}, the following message from our financial department about your recent payment:<br><br>

*{{$message}}*

Thanks,<br>
{{ config('app.name') }}
@endcomponent
