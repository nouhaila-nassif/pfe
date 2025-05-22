import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
newProduct: Product = {
  name: '',
  price: 0,
  description: ''
};  editingProduct: Product | null = null;

  constructor(private productService: ProductService,
      public authService: AuthService  // injecte AuthService ici

  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => this.products = data);
  }

 createProduct() {
  const roles = this.authService.getRoles();  // récupère les rôles de l'utilisateur connecté

  if (!roles.includes('ADMIN')) {
    alert('Accès refusé : vous devez être ADMIN pour créer un produit.');
    return;
  }

  this.productService.createProduct(this.newProduct).subscribe(() => {
    this.newProduct = { name: '', price: 0, description: '' };
    this.loadProducts();
  }, error => {
    console.error('Erreur lors de la création du produit:', error);
    alert('Erreur lors de la création du produit.');
  });
}


  

editProduct(product: Product) {
  this.editingProduct = { ...product };
}

updateProduct() {
  const roles = this.authService.getRoles();
  if (!roles.includes('ADMIN')) {
    alert('Accès refusé : vous devez être ADMIN pour modifier un produit.');
    return;
  }
  
  if (this.editingProduct?.id != null) {
    this.productService.updateProduct(this.editingProduct.id, this.editingProduct).subscribe({
      next: () => {
        this.editingProduct = null;
        this.loadProducts();
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du produit:', err);
        if (err.status === 403) {
          alert('Accès refusé : vous n’avez pas les droits pour modifier ce produit.');
        } else {
          alert('Erreur lors de la mise à jour du produit.');
        }
      }
    });
  }
}


cancelEdit() {
  this.editingProduct = null;
}

deleteProduct(id?: number) {
  const roles = this.authService.getRoles();
  if (!roles.includes('ADMIN')) {
    alert('Accès refusé : vous devez être ADMIN pour supprimer un produit.');
    return;
  }

  if (id != null) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du produit:', err);
        if (err.status === 403) {
          alert('Accès refusé : vous n’avez pas les droits pour supprimer ce produit.');
        } else {
          alert('Erreur lors de la suppression du produit.');
        }
      }
    });
  }
}


}
