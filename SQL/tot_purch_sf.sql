CREATE OR REPLACE FUNCTION TOT_PURCH_SF (
    p_shopper_id IN NUMBER
) RETURN NUMBER
IS
    v_total NUMBER;
BEGIN
    SELECT NVL(SUM(total), 0)
    INTO v_total
    FROM bb_basket
    WHERE idshopper = p_shopper_id;

    RETURN v_total;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN 0;
END TOT_PURCH_SF;
/