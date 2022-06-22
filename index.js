const App = {

    data: {
        elements: {
            root: document.querySelector('#root'),
            header: document.querySelector('header'),
            main: document.querySelector('main'),
            pdfBtn: document.getElementById('pdfBtn'),
            printBtn: document.getElementById('printBtn'),
            btns: document.getElementById('btns'),
        }
    },

    init: (data) => {
        App.data = {
            ...data,
            ...App.data
        }
        App.handler()
    },

    handler: () => {
        App.data.elements.pdfBtn.addEventListener('click', App.handleSavePdf)
        App.data.elements.printBtn.addEventListener('click', App.handlePrint)
        App.render()
    },

    handleSavePdf: () => {
        html2pdf().from(App.data.elements.root).save('invoice');
    },

    handlePrint: () => {
        App.data.elements.btns.style.display = 'none'
        window.print()
        App.data.elements.btns.style.display = 'flex'
    },

    renderHeader: () => {
        App.data.elements.header.innerHTML = `
            <h2>
                <div>
                    <span class="seconde-title">شماره سریال</span>
                    <span class="seconde-title">
                        ${App.convertingNumber(App.data.serial, true)}
                    </span>
                </div>
            </h2>
            <h2 class="main-title ">صورتحساب فروش کالا و خدمات</h2>
            <h2 class="end">
                <div class="end">
                    <span class="seconde-title">تاریخ</span>
                    <span class="seconde-title">
                        ${new Date().toLocaleDateString('fa-IR')}
                    </span>
                </div>
            </h2>
        `
    },

    renderTitledBox: (title, children, border, column) =>
        `<div class="container" style="margin-bottom: 35px">
            <div class="row" style="background: #ededed">
                <span class="seconde-form"
                    style="border-bottom: ${!border ? 3 : 0}px solid black; width: 100%; text-align: center;">${title}</span>
            </div>
            <div class="row" style="justify-content: space-between;${column ? 'flex-direction: column' : ''}">
                ${children}
            </div >
        </div > `
    ,

    renderInvoice: () => App.renderTitledBox('مشخصات صورتحساب', `
    <div class="container" style = "border: none;" >
        <div class="row" style="flex-direction: column; align-items: start;">
            <span class="seconde-title">
                <span class="title">
                    شماره مالیاتی
                </span>
                <span>
                    ${App.convertingNumber(App.data.invoice.taxId, true)}
                </span>
            </span>
            <span class="seconde-title">
                <span class="title">
                    تاریخ و زمان صدور صورتحساب
                </span>
                <span>
                    ${App.data.invoice.createDate}
                </span>
            </span>
        </div>
        </div >
        <div class="container" style="border: none;">
            <div class="row" style="flex-direction: column; align-items: start;">
                <span class="seconde-title" style="min-width: 100%;">
                    <span class="title">
                        نوع صورتحساب
                    </span>
                    <span>
                        ${App.data.invoice.invoiceType}
                    </span>
                </span>
                <span class="seconde-title">
                    <span class="title">
                        الگوی صورتحساب
                    </span>
                    <span>
                        ${App.data.invoice.invoiceDesign}
                    </span>
                </span>
            </div>
        </div>
        <div class="container" style="border: none;">
            <div class="row" style="flex-direction: column; align-items: start;">
                <span class="seconde-title">
                    <span class="title">
                        موضوع صورتحساب
                    </span>
                    <span>
                        ${App.data.invoice.invoiceTitle}
                    </span>
                </span>
                <span class="seconde-title">
                    <span class="title">
                        سریال صورتحساب
                    </span>
                    <span>
                        ${App.convertingNumber(App.data.invoice.invoiceId)}
                    </span>
                </span>
            </div>
        </div>
`),


    renderSeller: () => App.renderTitledBox('مشخصات فروشنده', `
    <div class="container" style = "border: none;" >
        <div class="row" style="flex-direction: column; align-items: start;">
            <span class="seconde-title">
                <span class="title">
                    نام واحد تجاری
                </span>
                <span>
                    ${App.data.seller.name}
                </span>
            </span>
        </div>
        </div >
        <div class="container" style="border: none;">
            <div class="row" style="flex-direction: column; align-items: start; justify-content: strart">
                <span class="seconde-title" style="min-width: 100%;">
                    <span class="title">
                        شماره اقتصادی
                    </span>
                    <span>
                        ${App.convertingNumber(App.data.seller.code, true)}
                    </span>
                </span>
            </div>
        </div>
        <div class="container" style="border: none;">
            <div class="row" style="flex-direction: column; align-items: start;">
                <span class="seconde-title">
                    <span class="title">
                        کد شعبه
                    </span>
                    <span>
                        ${App.convertingNumber(App.data.seller.postalCode, true)}
                    </span>
                </span>
            </div>
        </div>
        <div class="container" style="border: none;">
            <div class="row" style="flex-direction: column; align-items: start;">
                <span class="seconde-title">
                    <span class="title">
                        کدپستی
                    </span>
                    <span>
                        ${App.convertingNumber(App.data.seller.number, true)}
                    </span>
                </span>
            </div>
        </div>
    `),

    renderBuyer: () => App.renderTitledBox('مشخصات خریدار',
        `<div class="row" style="justify-content: space-between;">
            <div class="container" style="border: none;">
                <div class="row" style="flex-direction: column; align-items: start;">
                    <span class="seconde-title">
                        <span class="title">
                            نام واحد تجاری
                        </span>
                        <span>
                            ${App.data.buyer.name}
                        </span>
                    </span>
                    <span class="seconde-title">
                        <span class="title">
                            شماره/شناسه ملی
                        </span>
                        <span>
                            ${App.convertingNumber(App.data.buyer.id, true)}
                        </span>
                    </span>
                </div>
            </div>
            <div class="container" style="border: none;">
                <div class="row" style="flex-direction: column; align-items: start;">
                    <span class="seconde-title" style="min-width: 100%;">
                        <span class="title">
                            نوع شخص
                        </span>
                        <span>
                            ${App.data.buyer.buyerType}
                        </span>
                    </span>
                    <span class="seconde-title">
                        <span class="title">
                            کدپستی
                        </span>
                        <span>
                            ${App.convertingNumber(App.data.buyer.postalCode, true)}
                        </span>
                    </span>
                </div>
            </div>
            <div class="container" style="border: none;">
                <div class="row" style="flex-direction: column; align-items: start;">
                    <span class="seconde-title">
                        <span class="title">
                            کد اقتصادی
                        </span>
                        <span>
                            ${App.convertingNumber(App.data.buyer.code, true)}
                        </span>
                    </span>
                    <span class="seconde-title">
                        <span class="title">
                            کد شعبه
                        </span>
                        <span>
                            ${App.convertingNumber(App.data.buyer.number, true)}
                        </span>
                    </span>
                </div>
            </div>
            <div class="container" style="border: none;">
                <div class="row" style="flex-direction: column; align-items: start;">
                    <span class="seconde-title">
                        <span class="title">
                            آدرس
                        </span>
                        <span>
                            ${App.data.buyer.address}
                        </span>
                    </span>
                </div>
            </div>
        </div >
        <div style="width: 100%;overflow-x: auto;">
            <div class="row" style="background: #ededed">
                <span class="seconde-form"
                    style="border-top: 3px solid black; width: 100%; text-align: center;">مشخصات کالا یا خدمات</span>
            </div>
            <table style="border-top: 0;"></table>
        </div>
    `, false, true),

    renderMain: () => {
        App.data.elements.main.innerHTML = App.renderInvoice() + App.renderSeller() + App.renderBuyer() + App.data.elements.main.innerHTML
        App.data.elements.table = document.querySelector('table')
    },

    renderPaymentInfo: () => `
        <div class="row" style="flex-direction: column; align-items: start;">
            <span class="seconde-title">
                <span class="title">
                    روش تسویه
                </span>
                <span>
                    ${App.data.table.paymentInfo.paymentType}
                </span>
            </span>
        </div>
        <div class="row" style="flex-direction: column; align-items: start;">
            <span class="seconde-title">
                <span class="title">
                    مبلغ پرداختی نقدی
                </span>
                <span>
                    ${App.convertingNumber(App.data.table.paymentInfo.cash)}
                </span>
            </span>
        </div>
        <div class="row" style="flex-direction: column; align-items: start;">
            <span class="seconde-title">
                <span class="title">
                    مبلغ پرداختی نسیه
                </span>
                <span>
                    ${App.convertingNumber(App.data.table.paymentInfo.credit)}
                </span>
            </span>
        </div>
    `,

    renderTableData: () => App.data.table.data.map((data, index) => (`
    <tr>
            <td>${App.convertingNumber(index + 1, true)}</td>
            <td style="border-left: 1.5px solid black; border-right: 1.5px solid black;">
                ${App.convertingNumber(data.productCode, true)}
            </td>
            <td style="border-left: 1.5px solid black; border-right: 1.5px solid black;">
                ${data.productDescription}
                </td>
            <td style="border-left: 1.5px solid black; border-right: 1.5px solid black;">
                ${data.unit}
                </td>
            <td style="border-left: 1.5px solid black; border-right: 1.5px solid black;">
                ${App.convertingNumber(data.amount)}
            </td>
            <td style="border-left: 1.5px solid black; border-right: 1.5px solid black;">
                ${App.convertingNumber(data.unitPrice)}
            </td>
            <td style="border-left: 1.5px solid black; border-right: 1.5px solid black;">
                ${App.convertingNumber(data.totalPrice)}
            </td>
            <td style="border-left: 1.5px solid black; border-right: 1.5px solid black;">
                ${App.convertingNumber(data.offPrice)}
            </td>
            <td style="border-left: 1.5px solid black; border-right: 1.5px solid black;">
                ${App.convertingNumber(data.off)}
            </td>
            <td style="border-left: 1.5px solid black; border-right: 1.5px solid black;">
                ${App.convertingNumber(data.taxPercent)}
            </td>
            <td style="border-left: 1.5px solid black; border-right: 1.5px solid black;">
                ${App.convertingNumber(data.tax)}
            </td>
            <td style="border-left: 1.5px solid black; border-right: 1.5px solid black;">
                ${App.convertingNumber(data.other)}
            </td>
            <td style="border-right: 1.5px solid black;">
                ${App.convertingNumber(data.price)}
            </td>
        </tr >
    `)).join(""),

    renderTable: () => {
        App.data.elements.table.innerHTML = `
            <tr>
                <th>ردیف</th>
                <th style="border-left: 1.5px solid black; border-right: 1.5px solid black;">شناسه کالا / خدمات</th>
                <th style="border-left: 1.5px solid black; border-right: 1.5px solid black;">شرح کالا</th>
                <th style="border-left: 1.5px solid black; border-right: 1.5px solid black;">واحد اندازه گیری</th>
                <th style="border-left: 1.5px solid black; border-right: 1.5px solid black;">تعداد / مقدار</th>
                <th style="border-left: 1.5px solid black; border-right: 1.5px solid black;">مبلغ واحد</th>
                <th style="border-left: 1.5px solid black; border-right: 1.5px solid black;">مبلغ قبل از تخفیف</th>
                <th style="border-left: 1.5px solid black; border-right: 1.5px solid black;">مبلغ تخفیف</th>
                <th style="border-left: 1.5px solid black; border-right: 1.5px solid black;">مبلغ بعد از تخفیف</th>
                <th style="border-left: 1.5px solid black; border-right: 1.5px solid black;">نرخ مالیات بر ارزش افزوده به درصد</th>
                <th style="border-left: 1.5px solid black; border-right: 1.5px solid black;">مبلغ مالیات بر ارزش افزوده</th>
                <th style="border-left: 1.5px solid black; border-right: 1.5px solid black;">مجموع سایر مالیات، عوارض و وجوه قانونی</th>
                <th style="border-right: 1.5px solid black;">مبلغ کل کالا/ خدمت</th>
            </tr >
            ${App.renderTableData()}
            <tr style="background: #ddd">
                <td colspan="6"
                    style="border-left: 1.5px solid black;">
                        جمع کل
                </td>
                <td style="border-left: 1.5px solid black; border-right: 1.5px solid black;">
                    ${App.convertingNumber(App.data.table.total.totalPrice)}
                </td>
                <td style="border-left: 1.5px solid black; border-right: 1.5px solid black;">
                    ${App.convertingNumber(App.data.table.total.off)}
                </td>
                <td style="border-left: 1.5px solid black; border-right: 1.5px solid black;">
                    ${App.convertingNumber(App.data.table.total.offPrice)}
                </td>
                <td style="border-left: 1.5px solid black; border-right: 1.5px solid black;">
                </td>
                <td style="border-left: 1.5px solid black; border-right: 1.5px solid black;">
                ${App.convertingNumber(App.data.table.total.taxPrice)}
                </td>
                <td style="border-left: 1.5px solid black; border-right: 1.5px solid black;">
                    ${App.convertingNumber(App.data.table.total.other)}
                </td>
                <td style="border-right: 1.5px solid black;">
                    ${App.convertingNumber(App.data.table.total.total)}
                </td>
            </tr>
            <tr>
                <td colspan="13"
                    style="border-bottom: 0; padding: 0">
                    <div class="row" style="background: #ededed">
                        <span class="seconde-form"
                            style="border-bottom: 3px solid black; width: 100%; text-align: center; font-size: 15px">اطلاعات پرداخت</span>
                    </div>
                    <div class="row" style="justify-content: ">
                        ${App.renderPaymentInfo()}
                    </div >
                </td>
            </tr>`
    },

    convertingNumber: (data, withoutComma) => withoutComma ?
        (String(data).replace(/[0-9]/g, n => Number(n).toLocaleString('fa'))).replace(/[٬]/g, '') :
        String(data).replace(/[0-9]/g, n => Number(n).toLocaleString('fa')),

    render: () => {
        App.renderHeader()
        App.renderMain()
        App.renderTable()
    }

}



//pass in form data
App.init({
    serial: '1111111111',
    invoice: {
        taxId: '123456',
        createDate: new Date().toLocaleDateString('fa-IR'),
        invoiceType: 'نوع اول',
        invoiceDesign: 'الگوی اول',
        invoiceTitle: 'اصلی',
        invoiceId: '1327965'
    },
    seller: {
        name: 'نامی تجاری',
        number: "32456",
        code: "8975",
        postalCode: '98040014'
    },
    buyer: {
        name: 'نامی تجاری',
        buyerType: "حقوقی",
        number: "32456",
        id: "20113968200002",
        code: "8975",
        postalCode: '98040014',
        address: "کمی نرسیده به آن طرف"
    },
    table: {
        data: [
            {
                productCode: '123',
                productDescription: "کالا اول",
                unit: "kg",
                amount: '3.2',
                unitPrice: "100",
                totalPrice: '1200',
                off: '200',
                offPrice: '1000',
                taxPercent: "20%",
                tax: "10",
                other: "0",
                price: "500",
            },
            {
                productCode: '231',
                productDescription: "کالا دوم",
                unit: "عدد",
                amount: '2',
                unitPrice: "10",
                totalPrice: '90',
                off: '20',
                offPrice: '70',
                taxPercent: "5%",
                tax: "2",
                other: "0",
                price: "70",
            },
        ],
        paymentInfo: {
            paymentType: "نقد",
            cash: '550000',
            credit: '12000'
        },
        total: {
            totalPrice: '1310',
            off: '1070',
            offPrice: '220',
            taxPrice: '12',
            other: '0',
            total: "570"
        }
    },
})