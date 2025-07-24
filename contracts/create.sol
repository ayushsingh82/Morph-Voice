// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InvoiceCreation {
    enum PaymentStatus { Pending, Paid }

    struct Invoice {
        uint256 invoiceId;
        address sender;
        address recipient;
        uint256 amount;
        uint256 timestamp;
        PaymentStatus status;
        bool isActive;
    }

    mapping(uint256 => Invoice) public invoices;
    uint256 public invoiceCounter;

    event InvoiceCreated(
        uint256 indexed invoiceId,
        address indexed sender,
        address indexed recipient,
        uint256 amount,
        uint256 timestamp
    );

    event InvoicePaid(
        uint256 indexed invoiceId,
        address indexed payer,
        uint256 amount,
        uint256 timestamp
    );

    // Function to create invoice
    function createInvoice(
        address _recipientAddress,
        uint256 _amount
    ) public {
        invoiceCounter++;
        
        invoices[invoiceCounter] = Invoice({
            invoiceId: invoiceCounter,
            sender: msg.sender,
            recipient: _recipientAddress,
            amount: _amount,
            timestamp: block.timestamp,
            status: PaymentStatus.Pending,
            isActive: true
        });

        emit InvoiceCreated(
            invoiceCounter,
            msg.sender,
            _recipientAddress,
            _amount,
            block.timestamp
        );
    }

    // Function to mark invoice as paid
    function markInvoiceAsPaid(uint256 _invoiceId) public {
        require(invoices[_invoiceId].isActive, "Invoice does not exist");
        require(msg.sender == invoices[_invoiceId].recipient, "Only recipient can mark as paid");
        require(invoices[_invoiceId].status == PaymentStatus.Pending, "Invoice is already paid");

        invoices[_invoiceId].status = PaymentStatus.Paid;

        emit InvoicePaid(
            _invoiceId,
            msg.sender,
            invoices[_invoiceId].amount,
            block.timestamp
        );
    }

    // Function to get invoice payment status
    function getInvoiceStatus(uint256 _invoiceId) public view returns (PaymentStatus) {
        require(invoices[_invoiceId].isActive, "Invoice does not exist");
        return invoices[_invoiceId].status;
    }

    // Function to get invoice details
    function getInvoice(uint256 _invoiceId) public view returns (
        address sender,
        address recipient,
        uint256 amount,
        PaymentStatus status,
        uint256 timestamp,
        bool isActive
    ) {
        require(invoices[_invoiceId].isActive, "Invoice does not exist");
        Invoice storage invoice = invoices[_invoiceId];
        return (
            invoice.sender,
            invoice.recipient,
            invoice.amount,
            invoice.status,
            invoice.timestamp,
            invoice.isActive
        );
    }

    // Function to get all invoices for an address (either as sender or recipient)
    function getInvoicesForAddress(address _address) public view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](invoiceCounter);
        uint256 count = 0;
        
        for (uint256 i = 1; i <= invoiceCounter; i++) {
            if (invoices[i].sender == _address || invoices[i].recipient == _address) {
                result[count] = i;
                count++;
            }
        }
        
        // Resize array to actual count
        uint256[] memory finalResult = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            finalResult[i] = result[i];
        }
        
        return finalResult;
    }

    // Function to check if sender owns the invoice
    function isInvoiceOwner(uint256 _invoiceId, address _address) public view returns (bool) {
        return invoices[_invoiceId].sender == _address;
    }

    // Function to get total number of invoices
    function getTotalInvoices() public view returns (uint256) {
        return invoiceCounter;
    }
}



