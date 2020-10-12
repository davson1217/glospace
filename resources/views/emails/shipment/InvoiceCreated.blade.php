@component('mail::message')
# You have an outstanding invoice

Dear {{$clientName}}, an invoice for the shipment with consignment number {{$trackingNumber}} has been created.
Kindly login to your Glospace account to view your invoice. <br>

<em>How do you clear your invoice ? </em> <br>

You may clear your invoice by making invoice-corresponding payments to the account prescription stated below and then
**upload** the receipt via your glospace account.

*{{$note}}*

<b>{{ config('app.name') }}</b>
@endcomponent
