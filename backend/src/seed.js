import db from './config/database.js';

// Wait for DB to be ready
setTimeout(() => {
  console.log('Seeding database with MonCafé data...');

  // Clear existing data
  db.serialize(() => {
    db.run('DELETE FROM order_items');
    db.run('DELETE FROM payments');
    db.run('DELETE FROM orders');
    db.run('DELETE FROM menu_items');
    db.run('DELETE FROM categories');
    db.run('DELETE FROM tables');
    db.run('DELETE FROM inventory');

    // Reset auto-increment
    db.run("DELETE FROM sqlite_sequence");

    // === CATEGORIES ===
    const categories = [
      ['Boissons Chaudes', 'Thés, cafés et infusions'],
      ['Boissons Froides', 'Jus frais, smoothies et sodas'],
      ['Petit Déjeuner', 'Msemen, harcha, baghrir et viennoiseries'],
      ['Plats Principaux', 'Tajines, couscous et grillades'],
      ['Sandwichs & Snacks', 'Bocadillos, paninis et wraps'],
      ['Pâtisseries & Desserts', 'Pâtisseries marocaines et orientales'],
      ['Crêpes & Gaufres', 'Crêpes, gaufres et pancakes'],
    ];

    const catStmt = db.prepare('INSERT INTO categories (name, description) VALUES (?, ?)');
    categories.forEach(c => catStmt.run(c));
    catStmt.finalize();

    // === MENU ITEMS ===
    const items = [
      // Boissons Chaudes (cat 1)
      ['Nous Nous (Thé à la Menthe)', 'Thé vert à la menthe fraîche et sucre', 1, 10],
      ['Café Noir (Kahwa)', 'Café noir intense servi en verre', 1, 8],
      ['Café au Lait (Qahwa Hlib)', 'Café avec lait chaud mousseux', 1, 12],
      ['Cappuccino', 'Espresso avec mousse de lait onctueuse', 1, 15],
      ['Café Noisette', 'Espresso avec une touche de lait', 1, 10],
      ['Chocolat Chaud', 'Chocolat au lait crémeux', 1, 15],
      ['Thé aux Herbes (Louiza)', 'Infusion de verveine citronnelle', 1, 10],
      ['Sahlab', 'Boisson chaude à la fleur d\'oranger et cannelle', 1, 18],

      // Boissons Froides (cat 2)
      ['Jus d\'Orange Pressé', 'Oranges fraîches pressées minute', 2, 12],
      ['Jus d\'Avocat', 'Avocat mixé avec lait et sucre', 2, 18],
      ['Jus Panache', 'Mix de fruits de saison', 2, 20],
      ['Milkshake Banane', 'Banane, lait, glace vanille', 2, 20],
      ['Smoothie Fruits Rouges', 'Fraise, framboise, myrtille', 2, 22],
      ['Eau Minérale Sidi Ali', 'Bouteille 50cl', 2, 5],
      ['Coca Cola / Fanta', 'Canette 33cl', 2, 10],
      ['Ice Tea Pêche', 'Thé glacé à la pêche', 2, 12],

      // Petit Déjeuner (cat 3)
      ['Msemen Nature', 'Crêpe feuilletée marocaine', 3, 5],
      ['Msemen au Miel', 'Msemen servi avec du miel pur', 3, 8],
      ['Harcha', 'Galette de semoule grillée', 3, 5],
      ['Baghrir', 'Crêpe mille trous avec beurre et miel', 3, 8],
      ['Rghaif Farci', 'Rghaif farci viande hachée et oignons', 3, 12],
      ['Œufs à la Marocaine', 'Œufs pochés en sauce tomate épicée', 3, 15],
      ['Formule Petit Déj Complet', 'Thé + msemen + harcha + miel + beurre + fromage', 3, 25],
      ['Croissant Beurre', 'Croissant pur beurre', 3, 6],
      ['Pain au Chocolat', 'Viennoiserie au chocolat', 3, 7],

      // Plats Principaux (cat 4)
      ['Tajine Poulet Olives Citron', 'Tajine de poulet aux olives et citron confit', 4, 40],
      ['Tajine Kefta aux Œufs', 'Boulettes de viande en sauce tomate avec œufs', 4, 35],
      ['Tajine Agneau Pruneaux', 'Tajine d\'agneau aux pruneaux et amandes', 4, 50],
      ['Couscous Royal', 'Semoule, légumes, poulet, agneau et merguez', 4, 55],
      ['Couscous Tfaya', 'Couscous poulet avec oignons caramélisés et raisins', 4, 50],
      ['Brochettes Mixtes', 'Brochettes bœuf et poulet avec frites et salade', 4, 45],
      ['Pastilla au Poulet', 'Feuilles de brick, poulet, amandes, sucre-cannelle', 4, 40],
      ['Tangia Marrakchia', 'Jarret de bœuf confit aux épices', 4, 55],

      // Sandwichs & Snacks (cat 5)
      ['Bocadillo Kefta', 'Pain rond, kefta grillée, salade, frites', 5, 20],
      ['Bocadillo Poulet', 'Pain rond, escalope poulet, fromage, crudités', 5, 22],
      ['Panini Mixte', 'Dinde, fromage fondu, légumes grillés', 5, 25],
      ['Tacos Marocain', 'Viande, frites, sauce fromagère, harissa', 5, 28],
      ['Chawarma Poulet', 'Poulet mariné, crudités, sauce blanche', 5, 25],
      ['Fish & Chips', 'Poisson pané, frites, sauce tartare', 5, 30],

      // Pâtisseries & Desserts (cat 6)
      ['Cornes de Gazelle', 'Pâte d\'amande et fleur d\'oranger (3 pièces)', 6, 15],
      ['Chebakia', 'Pâtisserie au miel et sésame (3 pièces)', 6, 12],
      ['Briouates aux Amandes', 'Triangles croustillants aux amandes (3 pièces)', 6, 12],
      ['Pastilla au Lait', 'Feuilles de brick, crème et amandes', 6, 18],
      ['Assortiment Pâtisseries', 'Sélection de 6 pâtisseries marocaines', 6, 30],
      ['Salade de Fruits', 'Fruits de saison coupés', 6, 15],

      // Crêpes & Gaufres (cat 7)
      ['Crêpe Nutella', 'Crêpe fine garnie de Nutella', 7, 15],
      ['Crêpe Nutella Banane', 'Crêpe Nutella avec rondelles de banane', 7, 18],
      ['Crêpe Miel Amandes', 'Crêpe avec miel et amandes grillées', 7, 16],
      ['Gaufre Chantilly', 'Gaufre avec crème chantilly et fruits', 7, 20],
      ['Gaufre Chocolat', 'Gaufre nappée de chocolat fondant', 7, 20],
    ];

    const itemStmt = db.prepare('INSERT INTO menu_items (name, description, category_id, price) VALUES (?, ?, ?, ?)');
    items.forEach(i => itemStmt.run(i));
    itemStmt.finalize();

    // === TABLES ===
    const tableStmt = db.prepare('INSERT INTO tables (table_number, capacity) VALUES (?, ?)');
    for (let i = 1; i <= 10; i++) {
      const capacity = i <= 4 ? 2 : (i <= 7 ? 4 : 6);
      tableStmt.run([i, capacity]);
    }
    tableStmt.finalize();

    // === INVENTAIRE ===
    const inventory = [
      ['Thé vert chinois', 10, 'kg', 3],
      ['Menthe fraîche', 5, 'bottes', 2],
      ['Café moulu', 8, 'kg', 3],
      ['Lait frais', 30, 'litres', 10],
      ['Sucre', 15, 'kg', 5],
      ['Farine', 20, 'kg', 8],
      ['Semoule', 15, 'kg', 5],
      ['Huile d\'olive', 10, 'litres', 3],
      ['Oranges', 20, 'kg', 8],
      ['Avocats', 3, 'kg', 5],
      ['Poulet', 10, 'kg', 4],
      ['Viande hachée (Kefta)', 8, 'kg', 3],
      ['Agneau', 5, 'kg', 2],
      ['Olives', 5, 'kg', 2],
      ['Citrons confits', 3, 'kg', 1],
      ['Amandes', 4, 'kg', 2],
      ['Miel pur', 5, 'kg', 2],
      ['Nutella', 3, 'kg', 1],
      ['Œufs', 60, 'pièces', 20],
      ['Pain rond (khobz)', 30, 'pièces', 10],
    ];

    const invStmt = db.prepare('INSERT INTO inventory (item_name, quantity, unit, min_stock) VALUES (?, ?, ?, ?)');
    inventory.forEach(i => invStmt.run(i));
    invStmt.finalize();

    console.log('Database seeded successfully!');
    console.log(`- ${categories.length} catégories`);
    console.log(`- ${items.length} articles de menu`);
    console.log(`- 10 tables`);
    console.log(`- ${inventory.length} articles d'inventaire`);

    setTimeout(() => process.exit(0), 1000);
  });
}, 2000);
