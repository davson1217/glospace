@component('mail::message')
# You have an outstanding invoice

Dear {{$clientName}}, an invoice for the shipment with consignment number {{$trackingNumber}} has been created.
Kindly login to your Glospace account to view your invoice. <br>

**How do you clear your invoice ? ** <br>

You may clear your invoice by making invoice-corresponding payments to the account prescription stated below and then
**upload** the receipt via your glospace account.

*{{$note}}*

{{--@component('mail::button', ['url' => ''])--}}
{{--Button Text--}}
{{--@endcomponent--}}

Thanks for using Glospace,<br>
{{--{{ config('app.name') }}--}}
@endcomponent
