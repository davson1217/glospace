@component('mail::message')
# Invoice Paid

Dear {{$clientName}}, we can confirm that invoice #{{$invoiceNumber}} has been paid.

Thanks<br>
@endcomponent
