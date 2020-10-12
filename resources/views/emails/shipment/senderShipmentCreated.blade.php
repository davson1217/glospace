@component('mail::message')
# Your package is sent!

Dear {{$clientName}}, this email is to let you know that your package is being sent.
You may follow the progress of this shipment using the following tracking number: <br><br>

**{{$trackingNumber}}**

@if(!$hasGS)
**Note: ** You'll need to create a Glospace account in order to track your shipment.
@endif
<br><br>

Thanks,<br>
{{ config('app.name') }}
@endcomponent
