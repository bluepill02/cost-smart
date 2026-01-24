"use client";

import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Download, Printer, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { formatCurrency } from '@/lib/formatters';

interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    rate: number;
}

export default function InvoiceGenerator() {
    const [seller, setSeller] = useState({ name: 'Your Business Name', address: '123 Business St, City, Country', email: 'contact@business.com' });
    const [buyer, setBuyer] = useState({ name: 'Client Name', address: '456 Client Rd, City, Country', email: 'client@email.com' });
    const [invoiceNo, setInvoiceNo] = useState('INV-001');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [currency, setCurrency] = useState('$');
    const [taxRate, setTaxRate] = useState(10);

    const [items, setItems] = useState<InvoiceItem[]>([
        { id: '1', description: 'Web Development Services', quantity: 1, rate: 500 }
    ]);

    const addItem = () => {
        setItems([...items, { id: Math.random().toString(), description: '', quantity: 1, rate: 0 }]);
    };

    const removeItem = (id: string) => {
        setItems(items.filter(i => i.id !== id));
    };

    const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
        setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
    };

    const totals = useMemo(() => {
        const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
        const tax = subtotal * (taxRate / 100);
        const total = subtotal + tax;
        return { subtotal, tax, total };
    }, [items, taxRate]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Editor Section - Hidden when printing */}
            <div className="space-y-6 print:hidden">
                <Card>
                    <CardContent className="p-6 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-600" /> Editor
                            </h2>
                            <div className="flex gap-2">
                                <Input
                                    className="w-16 text-center font-bold"
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    placeholder="$"
                                    aria-label="Currency Symbol"
                                />
                            </div>
                        </div>

                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="sellerName">Seller Details</Label>
                                <Input id="sellerName" value={seller.name} onChange={(e) => setSeller({...seller, name: e.target.value})} placeholder="Business Name" />
                                <Label htmlFor="sellerAddress" className="sr-only">Seller Address</Label>
                                <Textarea id="sellerAddress" value={seller.address} onChange={(e) => setSeller({...seller, address: e.target.value})} placeholder="Address" rows={2} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="clientName">Client Details</Label>
                                <Input id="clientName" value={buyer.name} onChange={(e) => setBuyer({...buyer, name: e.target.value})} placeholder="Client Name" />
                                <Label htmlFor="clientAddress" className="sr-only">Client Address</Label>
                                <Textarea id="clientAddress" value={buyer.address} onChange={(e) => setBuyer({...buyer, address: e.target.value})} placeholder="Address" rows={2} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="invoiceNo">Invoice #</Label>
                                    <Input id="invoiceNo" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="invoiceDate">Date</Label>
                                    <Input id="invoiceDate" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <Label>Line Items</Label>
                                <Button variant="outline" size="sm" onClick={addItem}><Plus size={14} className="mr-1"/> Add Item</Button>
                            </div>
                            {items.map((item, index) => (
                                <div key={item.id} className="flex gap-2 items-start">
                                    <Label htmlFor={`desc-${item.id}`} className="sr-only">Description</Label>
                                    <Input
                                        id={`desc-${item.id}`}
                                        className="flex-grow"
                                        value={item.description}
                                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                                        placeholder="Description"
                                    />
                                    <Label htmlFor={`qty-${item.id}`} className="sr-only">Quantity</Label>
                                    <Input
                                        id={`qty-${item.id}`}
                                        className="w-20"
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                                        placeholder="Qty"
                                    />
                                    <Label htmlFor={`rate-${item.id}`} className="sr-only">Rate</Label>
                                    <Input
                                        id={`rate-${item.id}`}
                                        className="w-24"
                                        type="number"
                                        value={item.rate}
                                        onChange={(e) => updateItem(item.id, 'rate', Number(e.target.value))}
                                        placeholder="Rate"
                                    />
                                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50" aria-label="Remove item">
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end items-center gap-4">
                            <Label htmlFor="taxRate">Tax Rate (%)</Label>
                            <Input
                                id="taxRate"
                                className="w-24 text-right"
                                type="number"
                                value={taxRate}
                                onChange={(e) => setTaxRate(Number(e.target.value))}
                            />
                        </div>

                        <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handlePrint}>
                            <Printer className="mr-2 h-4 w-4" /> Print Invoice / Save as PDF
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Preview Section - The only thing visible during print */}
            <div className="relative">
                <style jsx global>{`
                    @media print {
                        body * {
                            visibility: hidden;
                        }
                        #invoice-preview, #invoice-preview * {
                            visibility: visible;
                        }
                        #invoice-preview {
                            position: fixed;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            padding: 20px;
                            background: white;
                            z-index: 9999;
                        }
                        /* Hide headers/footers/etc */
                        header, footer, nav {
                            display: none !important;
                        }
                    }
                `}</style>

                <div id="invoice-preview" className="bg-white p-8 rounded-lg shadow-lg border min-h-[800px] text-slate-800">
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-4">INVOICE</h1>
                            <div className="text-slate-500 font-medium">#{invoiceNo}</div>
                            <div className="text-slate-500 text-sm mt-1">{date}</div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-xl mb-2">{seller.name}</div>
                            <div className="text-slate-600 whitespace-pre-line text-sm max-w-[200px] ml-auto">
                                {seller.address}
                            </div>
                        </div>
                    </div>

                    <div className="mb-12">
                        <div className="text-slate-500 text-sm uppercase tracking-wider mb-2 font-semibold">Bill To</div>
                        <div className="font-bold text-lg mb-1">{buyer.name}</div>
                        <div className="text-slate-600 whitespace-pre-line text-sm max-w-[300px]">
                            {buyer.address}
                        </div>
                    </div>

                    <table className="w-full mb-12">
                        <thead>
                            <tr className="border-b-2 border-slate-100 text-left">
                                <th className="py-3 font-semibold text-slate-600 w-[50%]">Description</th>
                                <th className="py-3 font-semibold text-slate-600 text-center">Qty</th>
                                <th className="py-3 font-semibold text-slate-600 text-right">Rate</th>
                                <th className="py-3 font-semibold text-slate-600 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id} className="border-b border-slate-50">
                                    <td className="py-4 text-slate-800">{item.description}</td>
                                    <td className="py-4 text-center text-slate-600">{item.quantity}</td>
                                    <td className="py-4 text-right text-slate-600">{currency}{item.rate.toFixed(2)}</td>
                                    <td className="py-4 text-right font-medium">{currency}{(item.quantity * item.rate).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-end">
                        <div className="w-[300px] space-y-3">
                            <div className="flex justify-between text-slate-600">
                                <span>Subtotal</span>
                                <span>{currency}{totals.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                                <span>Tax ({taxRate}%)</span>
                                <span>{currency}{totals.tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-slate-900 pt-4 border-t-2 border-slate-100">
                                <span>Total</span>
                                <span>{currency}{totals.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-slate-100 text-center text-slate-500 text-sm">
                        <p>Thank you for your business!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
