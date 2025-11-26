import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import type { ProductType } from '../types/Types'

interface ProductCardProps {
    product: ProductType
}

function ProductCard(props: ProductCardProps) {
    const { title, price, description, image } = props.product;

    return (
        <Card
            sx={{
                width: 330,
                height: 440,
                borderRadius: 5,
                overflow: "hidden",
                backgroundColor: "#ffffff",
                cursor: "pointer",
                transition: "all 0.25s ease",
                display: "flex",
                flexDirection: "column",         // sadece kolon olsun
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                border: "1px solid transparent",
                "&:hover": {
                    transform: "scale(1.05) translateY(-5px)",
                    boxShadow: "0 12px 26px rgba(0,0,0,0.14)",
                    borderColor: "rgba(59,130,246,0.6)",
                },
            }}
        >
            <img
                src={image}
                width={260}
                height={200}
                style={{
                    objectFit: "contain",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            />

            <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                    gutterBottom
                    variant="subtitle1"
                    sx={{
                        textAlign: 'center',
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        fontWeight: 600,
                        fontSize: 14,
                        minHeight: "40px",          // başlık yüksekliği sabit
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        color: "text.secondary",
                        minHeight: "60px",          // açıklama yüksekliği sabit
                    }}
                >
                    {description}
                </Typography>

                <div>
                    <p>Fiyat: {price} ₺</p>
                </div>
            </CardContent>


            <CardActions
                sx={{
                    justifyContent: "center",
                    mt: "auto",      // yukarıdaki alan ne olursa olsun bunu en alta iter
                    mb: 1,           // kartın altından hafif boşluk
                    pt: 0,
                }}
            >
                <Button size="small" variant="outlined" color="info">
                    Detay
                </Button>
            </CardActions>
        </Card>
    );
}

export default ProductCard;
