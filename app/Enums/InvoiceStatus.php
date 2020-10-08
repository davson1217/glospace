<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class InvoiceStatus extends Enum
{
    const Unpaid =   0;
    const Paid =   1;
    const Rejected = 2;
}
