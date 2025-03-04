package com.deepelectrocodingbackend.deepbackend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class ImageService {

    // Méthode pour compresser et redimensionner l'image avant de l'enregistrer dans la base de données
    public byte[] compressImage(MultipartFile imageFile) throws IOException {
        BufferedImage originalImage = ImageIO.read(imageFile.getInputStream());

        // Redimensionner l'image si nécessaire
        int width = 500;  // Largeur de l'image souhaitée
        int height = (originalImage.getHeight() * width) / originalImage.getWidth();  // Calcul automatique de la hauteur
        Image scaledImage = originalImage.getScaledInstance(width, height, Image.SCALE_SMOOTH);

        // Convertir l'image redimensionnée en BufferedImage
        BufferedImage resizedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        Graphics2D graphics = resizedImage.createGraphics();
        graphics.drawImage(scaledImage, 0, 0, null);
        graphics.dispose();

        // Compresser l'image en JPEG avec un taux de compression
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ImageIO.write(resizedImage, "jpg", byteArrayOutputStream);

        // Retourner l'image compressée sous forme de tableau d'octets
        return byteArrayOutputStream.toByteArray();
    }

    // Méthode pour décompresser l'image (si nécessaire)
    public byte[] decompressImage(byte[] compressedImage) throws IOException {
        // Décompression non implémentée ici, mais vous pouvez ajouter du code si vous le souhaitez
        return compressedImage;
    }
}
