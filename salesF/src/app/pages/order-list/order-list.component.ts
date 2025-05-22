import { Component, OnInit } from '@angular/core';
import { Order, OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-list',
    standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
   
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  selectedOrder?: Order;

  // Pour le formulaire création
  newOrder: Order = {
    product: '',
    quantity: 1,
    price: 0,
  };

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }

  viewOrder(id: number): void {
    this.orderService.getOrderById(id).subscribe(order => {
      this.selectedOrder = order;
    });
  }

  cancelOrder(id: number): void {
    if (confirm("Confirmer l'annulation de la commande ?")) {
      this.orderService.cancelOrder(id).subscribe(() => {
        this.loadOrders();
        if (this.selectedOrder?.id === id) {
          this.selectedOrder = undefined;
        }
      });
    }
  }

  createOrder(): void {
    this.orderService.createOrder(this.newOrder).subscribe(order => {
      this.orders.push(order);
      this.newOrder = { product: '', quantity: 1, price: 0 }; // reset form
    }, error => {
      alert('Erreur lors de la création de la commande : ' + error.message);
    });
  }
}