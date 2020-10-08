@component('mail::message')
{{--@if($hasGS)--}}
# Your Package is on the way !

Dear {{$clientName}}, we are glad to inform you that your package is on the way.
You may follow the progress of this shipment using the following *tracking number*: <br><br>

**{{$trackingNumber}}**

@if(!$hasGS)
**Note: ** You'll need to create a Glospace account in order to track your shipment.
@endif

<br><br>

Thank you for using Glospace.

{{--@component('mail::button', ['url' => ''])--}}
{{--Button Text--}}
{{--@endcomponent--}}

{{--Thanks,<br>--}}
{{--{{ config('app.name') }}--}}
@endcomponent
