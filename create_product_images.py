import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

shop_dir = r'd:\Shop\frontend\public\images\shop'
out_dir = r'd:\Shop\frontend\public\images\products'
os.makedirs(out_dir, exist_ok=True)

# Load source photos
im_tools = Image.open(os.path.join(shop_dir, 'handtools_and_hardware.jpg'))
im_paints = Image.open(os.path.join(shop_dir, 'paints_and_abrasives.jpg'))
im_power = Image.open(os.path.join(shop_dir, 'powertools_and_lubricants.jpg'))
im_owner = Image.open(os.path.join(shop_dir, 'storefront_owner.jpg'))

def create_product_card(product_id, title, brand, category, base_crop=None, badge_color=(217, 119, 6), theme_color=(15, 23, 42)):
    W, H = 600, 420
    # Clean studio background
    card = Image.new('RGB', (W, H), (248, 250, 252))
    draw = ImageDraw.Draw(card)
    
    # Subtle top header band
    draw.rectangle([0, 0, W, 6], fill=badge_color)

    # If base_crop provided, resize and center it nicely
    if base_crop:
        # Resize crop maintaining aspect ratio
        crop_w, crop_h = base_crop.size
        target_w = 560
        target_h = 320
        ratio = min(target_w / crop_w, target_h / crop_h)
        new_size = (int(crop_w * ratio), int(crop_h * ratio))
        resized = base_crop.resize(new_size, Image.Resampling.LANCZOS)
        
        # Add subtle shadow under image
        paste_x = (W - new_size[0]) // 2
        paste_y = 20 + (target_h - new_size[1]) // 2
        
        # Soft border box around crop
        draw.rectangle([paste_x - 4, paste_y - 4, paste_x + new_size[0] + 4, paste_y + new_size[1] + 4], fill=(255, 255, 255), outline=(226, 232, 240), width=1)
        card.paste(resized, (paste_x, paste_y))
    else:
        # Studio card with gradient background
        for y in range(H):
            r = int(245 - (y / H) * 15)
            g = int(247 - (y / H) * 15)
            b = int(250 - (y / H) * 12)
            draw.line([(0, y), (W, y)], fill=(r, g, b))

    # Bottom Overlay Bar with Brand, Title, and Authenticity Badge
    bar_y = 350
    draw.rectangle([0, bar_y, W, H], fill=(255, 255, 255))
    draw.line([(0, bar_y), (W, bar_y)], fill=(226, 232, 240), width=1)

    # Brand Pill
    pill_w = len(brand) * 9 + 20
    draw.rounded_rectangle([20, bar_y + 12, 20 + pill_w, bar_y + 36], radius=6, fill=(224, 242, 254), outline=(186, 230, 253))
    draw.text((28, bar_y + 17), brand.upper(), fill=(3, 105, 161))

    # Title
    disp_title = title if len(title) < 42 else title[:40] + '...'
    draw.text((20 + pill_w + 14, bar_y + 17), disp_title, fill=(15, 23, 42))

    # Genuine Stock Green Badge on Right
    draw.text((W - 135, bar_y + 17), "● Ready in Shop", fill=(22, 163, 74))

    # Save image
    out_path = os.path.join(out_dir, f"{product_id}.jpg")
    card.save(out_path, quality=92)
    print(f"Created {product_id}.jpg")

# 1. Taparia Spanners (Crop from handtools: left spanners tray)
crop_spanner = im_tools.crop((100, 140, 200, 560))
create_product_card('taparia-adj-spanner', 'Taparia Adjustable Spanner (Drop Forged)', 'Taparia', 'hand-tools', crop_spanner, badge_color=(217, 119, 6))

# 2. Taparia Pliers (Crop from handtools: center-right pliers box)
crop_pliers = im_tools.crop((690, 140, 785, 440))
create_product_card('taparia-pliers-set', 'Taparia Combination & Nose Pliers', 'Taparia', 'hand-tools', crop_pliers, badge_color=(217, 119, 6))

# 3. Taparia Screwdrivers (Crop from handtools: yellow & green handles)
crop_screwdrivers = im_tools.crop((305, 130, 410, 560))
create_product_card('taparia-screwdrivers', 'Taparia Precision Screwdrivers', 'Taparia', 'hand-tools', crop_screwdrivers, badge_color=(217, 119, 6))

# 4. Taparia Line Tester (Crop from handtools: yellow line testers)
crop_tester = im_tools.crop((320, 765, 570, 920)) if im_tools.height > 600 else im_tools.crop((320, 400, 570, 570))
create_product_card('taparia-line-testers', 'Taparia Neon Line Tester (813/814)', 'Taparia', 'hand-tools', crop_tester, badge_color=(217, 119, 6))

# 5. Taparia Allen Key Set (Crop from handtools: green box bottom right)
crop_allen = im_tools.crop((580, 610, 750, 920)) if im_tools.height > 600 else im_tools.crop((580, 400, 750, 570))
create_product_card('taparia-allen-key-set', 'Taparia Hex Key Allen Wrench Set', 'Taparia', 'hand-tools', crop_allen, badge_color=(217, 119, 6))

# 6. PYE Wire Stripper (Crop from handtools: blue package)
crop_pye = im_tools.crop((410, 140, 510, 480))
create_product_card('pye-wire-stripper', 'PYE 950 Heavy Duty Wire Stripper', 'PYE', 'hand-tools', crop_pye, badge_color=(37, 99, 235))

# 7. Apollo Threading Taps & Dies (Crop from paints rack top right)
crop_apollo_taps = im_paints.crop((850, 10, 1010, 270))
create_product_card('apollo-tap-die-set', 'Apollo Threading Taps & Dies', 'Apollo', 'hand-tools', crop_apollo_taps, badge_color=(217, 119, 6))

# 8. Bosch Impact Drill (Crop from paints rack top shelf Bosch box)
crop_bosch = im_paints.crop((415, 15, 500, 150))
create_product_card('bosch-impact-drill', 'Bosch Professional Impact Drill', 'Bosch', 'power-tools', crop_bosch, badge_color=(3, 105, 161))

# 9. Ingco Cordless Kit (Crop from storefront orange cases)
crop_ingco = im_owner.crop((60, 460, 220, 530))
create_product_card('ingco-cordless-kit', 'Ingco Cordless Drill Kit (with Case)', 'Ingco', 'power-tools', crop_ingco, badge_color=(234, 88, 12))

# 10. Kobmax Electric Drill (Crop from showcase yellow box)
crop_kobmax_drill = im_power.crop((280, 0, 410, 200))
create_product_card('kobmax-electric-drill', 'Kobmax 10mm Electric Drill (KX12)', 'Kobmax', 'power-tools', crop_kobmax_drill, badge_color=(234, 179, 8))

# 11. Kobmax Electric Blower (Crop from showcase blower box)
crop_kobmax_blower = im_power.crop((405, 70, 530, 240))
create_product_card('kobmax-electric-blower', 'Kobmax High-Power Electric Blower (KX05)', 'Kobmax', 'power-tools', crop_kobmax_blower, badge_color=(234, 179, 8))

# 12. Xtra-Power Hammer Drill (Crop from paints top shelf red box)
crop_xtra = im_paints.crop((495, 0, 610, 150))
create_product_card('xtra-power-hammer-drill', 'Xtra-Power Rotary Hammer Drill (PT435)', 'Xtra-Power', 'power-tools', crop_xtra, badge_color=(220, 38, 38))

# 13. Measuring Wheel (Crop from paints top shelf red 10000m box)
crop_wheel = im_paints.crop((210, 0, 410, 140))
create_product_card('measuring-wheel-10000m', '10,000m Heavy-Duty Measuring Wheel', 'Global Pro', 'power-tools', crop_wheel, badge_color=(220, 38, 38))

# 14. Asian Paints Apcolite Gloss Enamel (Crop from paints rack row 1)
crop_apcolite = im_paints.crop((210, 190, 405, 350))
create_product_card('apcolite-gloss-enamel', 'Asian Paints Apcolite Gloss Enamel', 'Asian Paints', 'paints', crop_apcolite, badge_color=(217, 119, 6))

# 15. Super Synthetic Enamel (Crop from paints rack row 2)
crop_super_enamel = im_paints.crop((210, 400, 610, 550))
create_product_card('super-synthetic-enamel', 'Super Synthetic Enamel (Gates & Grills)', 'Asian Paints', 'paints', crop_super_enamel, badge_color=(15, 23, 42))

# 16. Red Oxide Primer (Crop from paints rack lower row)
crop_primer = im_paints.crop((340, 650, 410, 740)) if im_paints.height > 600 else im_paints.crop((210, 340, 410, 450))
create_product_card('red-oxide-primer', 'Anti-Rust Red Oxide Primer (1L & 4L)', 'Asian Paints', 'paints', crop_primer, badge_color=(185, 28, 28))

# 17. Spray Paints (Crop from showcase spray cans)
crop_spray = im_power.crop((290, 480, 445, 665))
create_product_card('aerosol-spray-paints', 'Quick-Dry Aerosol Spray Paint Cans', 'Aerol / Bosny', 'paints', crop_spray, badge_color=(147, 51, 234))

# 18. Paint Thinners (Crop from paints bottom shelf bottles)
crop_thinner = im_paints.crop((220, 400, 405, 570))
create_product_card('industrial-paint-thinners', 'Premium Paint Thinner & Brush Cleaner', 'Pure Blend', 'paints', crop_thinner, badge_color=(59, 130, 246))

# 19. Harrison Shutter Lock (Crop from handtools bottom left)
crop_harrison = im_tools.crop((85, 580, 190, 750)) if im_tools.height > 600 else im_tools.crop((85, 350, 190, 550))
create_product_card('harrison-shutter-lock', 'Harrison JAMA Heavy Shutter Lock 75mm', 'Harrison', 'locks', crop_harrison, badge_color=(202, 138, 4))

# 20. Brass Padlocks (Crop from showcase hanging padlocks)
crop_padlocks = im_power.crop((65, 210, 260, 960))
create_product_card('brass-padlocks-collection', 'Solid Brass Padlocks (Godrej / Harrison)', 'Harrison', 'locks', crop_padlocks, badge_color=(202, 138, 4))

# 21. Stainless Steel Fittings (Crop from counter drawer fittings)
crop_aldrop = im_tools.crop((190, 540, 300, 576))
create_product_card('architectural-hardware-fittings', 'Stainless Steel Aldrops & Tower Bolts', 'Classic Hardware', 'locks', crop_aldrop, badge_color=(100, 116, 139))

# 22. WD-40 Rust Remover (Crop from showcase WD-40 cans)
crop_wd40 = im_power.crop((405, 480, 445, 665))
create_product_card('wd40-rust-remover', 'WD-40 Multi-Use Rust & Squeak Spray', 'WD-40', 'adhesives', crop_wd40, badge_color=(37, 99, 235))

# 23. Fevicol HeatX & Araldite (Crop from showcase middle display)
crop_fevicol = im_power.crop((620, 760, 720, 890))
create_product_card('fevicol-heatx-araldite', 'Fevicol HeatX, Araldite & M-Seal', 'Fevicol / Pidilite', 'adhesives', crop_fevicol, badge_color=(220, 38, 38))

# 24. Motomax Chain Lube & Zorrik (Crop from showcase lube cans)
crop_motomax = im_power.crop((340, 320, 395, 435))
create_product_card('zorrik-motomax-lubricants', 'Motomax Chain Lube & Zorrik Spray', 'Motomax', 'adhesives', crop_motomax, badge_color=(217, 119, 6))

# 25. Machinery & 4T Engine Oil (Crop from showcase lower shelf)
crop_oil = im_power.crop((730, 520, 775, 665))
create_product_card('machinery-engine-lubricants', '4T Motorcycle Engine Oil & Machine Oil', 'Castrol / Servo', 'adhesives', crop_oil, badge_color=(22, 163, 74))

# 26. Braided Garden Hose (Crop from storefront garden hose stacks)
crop_hose = im_owner.crop((245, 430, 380, 540))
create_product_card('pvc-braided-garden-hose', 'Flexible Braided PVC Garden Hose Pipes', 'Kisan Gold', 'garden', crop_hose, badge_color=(22, 163, 74))

# 27. Wire Mesh Jali (Crop from paints rack bottom right jali)
crop_mesh = im_paints.crop((770, 840, 845, 1000)) if im_paints.height > 900 else im_paints.crop((770, 450, 845, 576))
create_product_card('gi-wire-mesh-jali', 'Galvanized Window Mesh / Mosquito Jali', 'Tata Wiron', 'garden', crop_mesh, badge_color=(100, 116, 139))

# 28. Emery Sandpaper (Crop from paints rack sandpaper roll)
crop_sandpaper = im_paints.crop((455, 800, 525, 915)) if im_paints.height > 800 else im_paints.crop((455, 450, 525, 570))
create_product_card('abrasive-emery-sandpaper', 'Waterproof Emery Sandpaper Sheets', 'JK Files', 'abrasives', crop_sandpaper, badge_color=(15, 23, 42))

# 29. Apollo Cutting Wheels (Crop from paints rack right shelf boxes)
crop_cutting = im_paints.crop((840, 730, 940, 830)) if im_paints.height > 800 else im_paints.crop((840, 400, 940, 520))
create_product_card('apollo-cutting-wheels', 'Apollo & Akari 4" Thin Cutting Wheels', 'Apollo', 'abrasives', crop_cutting, badge_color=(220, 38, 38))

print("All 29 product card images generated successfully!")

