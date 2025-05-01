CREATE OR REPLACE PROCEDURE BASKET_ADD_SP (
    p_basketid IN NUMBER,
    p_productid IN NUMBER,
    p_price IN NUMBER,
    p_quantity IN NUMBER,
    p_size IN NUMBER,
    p_form IN NUMBER
)
IS
BEGIN
    INSERT INTO bb_basketitem (
        idbasketitem, idbasket, idproduct, price, quantity, option1, option2
    )
    VALUES (
        bb_idbasketitem_seq.NEXTVAL, p_basketid, p_productid, p_price, p_quantity, p_size, p_form
    );
    COMMIT;
END BASKET_ADD_SP;
/
