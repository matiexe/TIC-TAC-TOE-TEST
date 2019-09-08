export class Block {
    free: true ;
    value: string;
    symbol: string;

    setValue(value) {
        this.value = value;
        if (this.value === 'tick') {
            this.symbol = 'close';
        } else {
            this.symbol = 'radio_button_unchecked';
        }
    }
}
