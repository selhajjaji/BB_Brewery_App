CREATE OR REPLACE PROCEDURE CHECK_BASKET_STOCK_SP (
    p_basket_id IN NUMBER,
    p_result OUT VARCHAR2
)
IS
    CURSOR cur_basket IS
        SELECT bi.idBasket, bi.quantity, p.stock
        FROM bb_basketitem bi
        INNER JOIN bb_product p ON bi.idProduct = p.idProduct
        WHERE bi.idBasket = p_basket_id;

    lv_flag_txt CHAR(1) := 'Y';
BEGIN
    FOR rec IN cur_basket LOOP
        IF rec.stock < rec.quantity THEN
            lv_flag_txt := 'N';
        END IF;
    END LOOP;

    IF lv_flag_txt = 'Y' THEN
        p_result := 'All items in stock!';
    ELSE
        p_result := 'All items NOT in stock!';
    END IF;
END CHECK_BASKET_STOCK_SP;
/
