DECLARE
  base_link TEXT;
  final_link TEXT;
  counter INTEGER := 1;
  reserved_names TEXT[] := ARRAY['lk', 'customize', 'page', 'checkout', 'api', 'profile', 'privacy', 'terms', 'contacts', 'demo'];
  user_email TEXT;
BEGIN
  -- Получаем email пользователя
  SELECT email INTO user_email FROM auth.users WHERE id = NEW.id;

  -- Генерируем базовую ссылку из ID пользователя
  base_link := 'u-' || substring(replace(NEW.id::text, '-', ''), 1, 8);

  -- Удаляем все недопустимые символы (оставляем только a-z, 0-9, _, -)
  base_link := regexp_replace(base_link, '[^a-z0-9_-]', '', 'g');

  -- Убедимся, что первый символ допустим (a-z0-9)
  IF NOT (substring(base_link, 1, 1) ~ '[a-z0-9]') THEN
    base_link := 'u' || base_link;
  END IF;

  -- Ограничиваем длину 20 символами
  base_link := substring(base_link, 1, 20);

  -- Убедимся, что длина не менее 2 символов
  IF length(base_link) < 2 THEN
    base_link := 'u-' || base_link;
  END IF;

  final_link := base_link;

  -- Проверяем на зарезервированные имена и добавляем суффикс, если нужно
  WHILE lower(final_link) = ANY(reserved_names) LOOP
    final_link := base_link || '-' || counter;
    counter := counter + 1;
  END LOOP;

  -- Вставляем новый проект с дополнительными данными
  INSERT INTO public.projects(
    user_id,
    link,
    email,
    blocks,
    "isPublish",
    created_at,
    primary_color,
    instagram_id,
    meta,
    user_info
  ) VALUES (
    NEW.id,
    final_link,
    user_email,
    ARRAY[
        jsonb_build_object(
          'type', 'type2',
          'block_id', gen_random_uuid(),  -- Генерация уникального block_id
          'created_at', NOW(),  -- Текущая дата и время для created_at
          'customization', jsonb_build_object(
            'title', 'Portfolio',
            'subtitle', 'A list of my works',
            'titleLevel', 3,
            'headerStyle', jsonb_build_object('alignItems', 'center'),
            'imageWrapperStyle', jsonb_build_object('borderRadius', 12),
            'imageStyle', '{}',
            'posts', jsonb_build_array(),
            'postsSettings', jsonb_build_object(
              'postsWithBg', true,
              'postsLength', 3,
              'postsType', 'grid',
              'postsStyle', jsonb_build_object('gap', 12)
            )
          )
        )
    ]::jsonb[],
    true,
    now(),
    '#d5ac8a',  -- цвет по умолчанию
    NULL,  -- instagram_id по умолчанию NULL
    jsonb_build_object(
      'title', 'Unknown',  -- Значение по умолчанию для title
      'description', 'Build Elegant Portfolio Gallery'  -- Значение по умолчанию для description
    ),
    jsonb_build_object(
      'name', 'John Doe',
      'description', 'Vision-driven CEO with a passion for innovation, team growth, and building products that make a real impact. I specialize in turning ambitious ideas into scalable businesses, aligning technology with user needs. With years of leadership experience, I focus on empowering teams, fostering creativity, and driving sustainable growth in competitive markets.',
      'profession', 'CEO (Chief Executive Officer)',
      'avatar', '/images/avatar.png'
    )
  );

  RETURN NEW;
END;